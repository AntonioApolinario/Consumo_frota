import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core';
import { Abastecimento, ChartDataPoint, DrillDownLevel } from '../models/dashboard.models';

// Mapeamento UF -> Região
const UF_TO_REGION: { [key: string]: string } = {
  // Norte
  'AC': 'Norte', 'AP': 'Norte', 'AM': 'Norte', 'PA': 'Norte',
  'RO': 'Norte', 'RR': 'Norte', 'TO': 'Norte',
  // Nordeste
  'AL': 'Nordeste', 'BA': 'Nordeste', 'CE': 'Nordeste', 'MA': 'Nordeste',
  'PB': 'Nordeste', 'PE': 'Nordeste', 'PI': 'Nordeste', 'RN': 'Nordeste', 'SE': 'Nordeste',
  // Centro-Oeste
  'DF': 'Centro-Oeste', 'GO': 'Centro-Oeste', 'MT': 'Centro-Oeste', 'MS': 'Centro-Oeste',
  // Sudeste
  'ES': 'Sudeste', 'MG': 'Sudeste', 'RJ': 'Sudeste', 'SP': 'Sudeste',
  // Sul
  'PR': 'Sul', 'RS': 'Sul', 'SC': 'Sul'
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private apiService: ApiService) {}

  getAbastecimentos(): Observable<Abastecimento[]> {
    return this.apiService.get<Abastecimento[]>('abastecimentos');
  }

  /**
   * Calcula dados agregados
   * - Regiões e Estados: mostra TODOS os itens
   * - Municípios: aplica regra dos 50% (top 50% + "Outros" clicável)
   */
  calculateChartData(
    abastecimentos: Abastecimento[],
    level: DrillDownLevel,
    excludedItems: string[] = []
  ): ChartDataPoint[] {
    let aggregated: { [key: string]: { value: number; items: Abastecimento[] } } = {};

    // Agregar dados baseado no nível
    for (const item of abastecimentos) {
      let key: string;
      
      if (level.type === 'regiao') {
        // Nível raiz: agrupar por região
        key = item.regiao || UF_TO_REGION[item.uf] || 'Centro-Oeste';
      } else if (level.type === 'estado') {
        // Drill-down em região: agrupar por estado
        const regiao = item.regiao || UF_TO_REGION[item.uf];
        if (regiao === level.value) {
          key = item.uf;
        } else {
          continue;
        }
      } else if (level.type === 'municipio') {
        // Drill-down em estado: agrupar por município
        if (item.uf === level.value) {
          key = item.cidade;
          // Pular municípios excluídos (quando expandindo "Outros")
          if (excludedItems.includes(key)) {
            continue;
          }
        } else {
          continue;
        }
      } else {
        continue;
      }

      if (!aggregated[key]) {
        aggregated[key] = { value: 0, items: [] };
      }
      aggregated[key].value += item.litros;
      aggregated[key].items.push(item);
    }

    // Converter para array e ordenar por consumo (decrescente)
    const sortedData = Object.entries(aggregated)
      .map(([label, data]) => ({
        label,
        value: data.value,
        items: data.items
      }))
      .sort((a, b) => b.value - a.value);

    if (sortedData.length === 0) {
      return [];
    }

    // Calcular total
    const total = sortedData.reduce((sum, item) => sum + item.value, 0);

    // Para regiões e estados: mostrar TODOS os itens
    if (level.type === 'regiao' || level.type === 'estado') {
      return sortedData.map(item => {
        const nextLevel = this.getNextLevel(level, item.label);
        return {
          label: item.label,
          value: item.value,
          percentage: (item.value / total) * 100,
          isOthers: false,
          level: nextLevel
        };
      });
    }

    // Para municípios: aplicar regra dos 50%
    const targetPercentage = 0.5; // 50%
    const chartData: ChartDataPoint[] = [];
    let accumulated = 0;
    let mainItems: typeof sortedData = [];
    let othersItems: typeof sortedData = [];

    for (const item of sortedData) {
      if (accumulated < total * targetPercentage) {
        mainItems.push(item);
        accumulated += item.value;
      } else {
        othersItems.push(item);
      }
    }

    // Adicionar itens principais
    for (const item of mainItems) {
      const nextLevel = this.getNextLevel(level, item.label);
      chartData.push({
        label: item.label,
        value: item.value,
        percentage: (item.value / total) * 100,
        isOthers: false,
        level: nextLevel
      });
    }

    // Adicionar "Outros" se houver itens restantes (CLICÁVEL)
    if (othersItems.length > 0) {
      const othersValue = othersItems.reduce((sum, item) => sum + item.value, 0);
      const excludedMunicipios = mainItems.map(item => item.label);
      
      chartData.push({
        label: 'Outros',
        value: othersValue,
        percentage: (othersValue / total) * 100,
        isOthers: true,
        level: {
          type: level.type,
          value: level.value, // Mantém o mesmo estado
          parent: level.parent,
          excludedItems: excludedMunicipios // Armazena municípios já mostrados
        }
      });
    }

    return chartData;
  }

  /**
   * Determina o próximo nível de drill-down
   */
  private getNextLevel(currentLevel: DrillDownLevel, value: string): DrillDownLevel {
    if (currentLevel.type === 'regiao') {
      return { type: 'estado', value: value, parent: currentLevel.value };
    } else if (currentLevel.type === 'estado') {
      return { type: 'municipio', value: value, parent: currentLevel.value };
    } else {
      // Município é o nível mais profundo, retorna o mesmo
      return { type: 'municipio', value: value, parent: currentLevel.parent };
    }
  }
}

