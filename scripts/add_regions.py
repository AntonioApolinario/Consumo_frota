#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para adicionar regiões brasileiras aos dados de abastecimento
"""
import json
import random

# Mapeamento UF -> Região
UF_TO_REGION = {
    # Norte
    'AC': 'Norte', 'AP': 'Norte', 'AM': 'Norte', 'PA': 'Norte', 
    'RO': 'Norte', 'RR': 'Norte', 'TO': 'Norte',
    # Nordeste
    'AL': 'Nordeste', 'BA': 'Nordeste', 'CE': 'Nordeste', 'MA': 'Nordeste',
    'PB': 'Nordeste', 'PE': 'Nordeste', 'PI': 'Nordeste', 'RN': 'Nordeste', 'SE': 'Nordeste',
    # Centro-Oeste
    'DF': 'Centro-Oeste', 'GO': 'Centro-Oeste', 'MT': 'Centro-Oeste', 'MS': 'Centro-Oeste',
    # Sudeste
    'ES': 'Sudeste', 'MG': 'Sudeste', 'RJ': 'Sudeste', 'SP': 'Sudeste',
    # Sul
    'PR': 'Sul', 'RS': 'Sul', 'SC': 'Sul'
}

# Principais municípios por UF (os que já aparecem nos dados + outros relevantes)
MUNICIPIOS_POR_UF = {
    'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá'],
    'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo'],
    'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque'],
    'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru'],
    'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Ilhéus', 'Juazeiro'],
    'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
    'DF': ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia'],
    'ES': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim'],
    'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
    'MA': ['São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Codó'],
    'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
    'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros'],
    'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'],
    'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
    'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'Foz do Iguaçu'],
    'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
    'PI': ['Teresina', 'Parnaíba', 'Picos', 'Floriano', 'Piripiri'],
    'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Petrópolis'],
    'RN': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba'],
    'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Cacoal', 'Vilhena'],
    'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí'],
    'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó'],
    'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância'],
    'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba'],
    'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
}

def main():
    # Carregar db.json
    with open('../api/db.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"Total de registros antes: {len(data['abastecimentos'])}")
    
    # Atualizar cada registro com região e garantir município válido
    for registro in data['abastecimentos']:
        uf = registro['uf']
        
        # Adicionar região
        registro['regiao'] = UF_TO_REGION.get(uf, 'Centro-Oeste')
        
        # Se o município não estiver na lista, usar a capital ou primeiro da lista
        if 'cidade' not in registro or not registro['cidade']:
            registro['cidade'] = MUNICIPIOS_POR_UF[uf][0]
        else:
            # Se a cidade atual não está na lista, substituir por uma aleatória válida
            cidades_validas = MUNICIPIOS_POR_UF.get(uf, [])
            if cidades_validas and registro['cidade'] not in cidades_validas:
                # Manter a cidade atual se for uma capital conhecida, senão trocar
                capitais = ['Rio Branco', 'Maceió', 'Macapá', 'Manaus', 'Salvador', 
                           'Fortaleza', 'Brasília', 'Vitória', 'Goiânia', 'São Luís',
                           'Cuiabá', 'Campo Grande', 'Belo Horizonte', 'Belém', 
                           'João Pessoa', 'Curitiba', 'Recife', 'Teresina', 
                           'Rio de Janeiro', 'Natal', 'Porto Velho', 'Boa Vista',
                           'Porto Alegre', 'Florianópolis', 'Aracaju', 'São Paulo', 'Palmas']
                
                if registro['cidade'] not in capitais:
                    registro['cidade'] = random.choice(cidades_validas)
    
    # Salvar db.json atualizado
    with open('../api/db.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Total de registros depois: {len(data['abastecimentos'])}")
    print("\nResumo por região:")
    
    # Contar por região
    regioes_count = {}
    for registro in data['abastecimentos']:
        regiao = registro['regiao']
        regioes_count[regiao] = regioes_count.get(regiao, 0) + 1
    
    for regiao, count in sorted(regioes_count.items()):
        print(f"  {regiao}: {count} registros")
    
    print("\n✅ Regiões adicionadas com sucesso!")

if __name__ == '__main__':
    main()
