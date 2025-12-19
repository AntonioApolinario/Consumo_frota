#!/usr/bin/env python3
"""
Script para gerar massa de dados mock de abastecimentos
Gera 200 registros com dados realistas para o painel de combustíveis
"""

import json
import random
from datetime import datetime, timedelta

# Dados base
POSTOS = [
    "Posto Ipiranga Centro", "Shell Asa Sul", "BR Petrobras", "Posto Ale",
    "Total Combustíveis", "Posto Rodoviário", "Shell Express", "Ipiranga Auto Posto",
    "BR Mania", "Posto Centro", "Shell Select", "Ipiranga Box", "Petrobras BR",
    "Posto da Rodovia", "Shell V-Power", "Ipiranga Km47", "Posto Cidade Nova",
    "BR Express", "Shell Avenida", "Posto Rodoanel"
]

ESTADOS = [
    {"uf": "DF", "cidades": ["Brasília", "Taguatinga", "Ceilândia", "Gama"]},
    {"uf": "SP", "cidades": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto", "Sorocaba"]},
    {"uf": "RJ", "cidades": ["Rio de Janeiro", "Niterói", "Duque de Caxias", "São Gonçalo"]},
    {"uf": "MG", "cidades": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"]},
    {"uf": "RS", "cidades": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas"]},
    {"uf": "PR", "cidades": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa"]},
    {"uf": "BA", "cidades": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari"]},
    {"uf": "CE", "cidades": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Sobral"]},
    {"uf": "PE", "cidades": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru"]},
    {"uf": "GO", "cidades": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde"]},
    {"uf": "SC", "cidades": ["Florianópolis", "Joinville", "Blumenau", "Chapecó"]},
    {"uf": "MA", "cidades": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon"]},
    {"uf": "ES", "cidades": ["Vitória", "Vila Velha", "Serra", "Cariacica"]},
    {"uf": "PB", "cidades": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos"]},
    {"uf": "RN", "cidades": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante"]},
    {"uf": "AL", "cidades": ["Maceió", "Arapiraca", "Rio Largo", "Palmeira dos Índios"]},
    {"uf": "MT", "cidades": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop"]},
    {"uf": "MS", "cidades": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá"]},
    {"uf": "SE", "cidades": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana"]},
    {"uf": "RO", "cidades": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Cacoal"]},
    {"uf": "TO", "cidades": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional"]},
    {"uf": "AC", "cidades": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá"]},
    {"uf": "AM", "cidades": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru"]},
    {"uf": "RR", "cidades": ["Boa Vista", "Rorainópolis", "Caracaraí", "Mucajaí"]},
    {"uf": "AP", "cidades": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque"]},
    {"uf": "PA", "cidades": ["Belém", "Ananindeua", "Santarém", "Marabá"]}
]

NOMES = [
    "João da Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa", "Carlos Ferreira",
    "Juliana Alves", "Ricardo Souza", "Fernanda Lima", "Paulo Rodrigues", "Camila Martins",
    "Lucas Pereira", "Beatriz Carvalho", "Rafael Gomes", "Larissa Ribeiro", "Thiago Barbosa",
    "Patricia Nascimento", "Felipe Araújo", "Amanda Rocha", "Bruno Dias", "Tatiana Moreira",
    "Diego Castro", "Mariana Freitas", "Roberto Teixeira", "Gabriela Cardoso", "André Mendes",
    "Vanessa Correia", "Marcelo Pinto", "Letícia Monteiro", "Rodrigo Cavalcanti", "Bianca Ramos",
    "Gustavo Nunes", "Carolina Azevedo", "Leonardo Vieira", "Isabella Gonçalves", "Vinicius Lopes",
    "Julia Cunha", "Henrique Batista", "Aline Duarte", "Eduardo Campos", "Natalia Rezende",
    "Alexandre Melo", "Priscila Moura", "Renato Farias", "Daniela Pires", "Fábio Barros",
    "Luciana Cruz", "Mauricio Santana", "Adriana Coelho", "Fernando Neves", "Silvia Torres"
]

VEICULOS = [
    {"modelo": "Fiat Uno", "combustivel": "Gasolina"},
    {"modelo": "Volkswagen Gol", "combustivel": "Etanol"},
    {"modelo": "Chevrolet Onix", "combustivel": "Gasolina"},
    {"modelo": "Ford Ka", "combustivel": "Gasolina"},
    {"modelo": "Hyundai HB20", "combustivel": "Gasolina"},
    {"modelo": "Mercedes Sprinter", "combustivel": "Diesel"},
    {"modelo": "Iveco Daily", "combustivel": "Diesel"},
    {"modelo": "Volkswagen Delivery", "combustivel": "Diesel"},
    {"modelo": "Ford Cargo", "combustivel": "Diesel"},
    {"modelo": "Scania R450", "combustivel": "Diesel"},
    {"modelo": "Volvo FH", "combustivel": "Diesel"},
    {"modelo": "Toyota Corolla", "combustivel": "Gasolina"},
    {"modelo": "Honda Civic", "combustivel": "Gasolina"},
    {"modelo": "Nissan Kicks", "combustivel": "Gasolina"},
    {"modelo": "Jeep Compass", "combustivel": "Gasolina"},
    {"modelo": "Renault Kwid", "combustivel": "Gasolina"},
    {"modelo": "Fiat Argo", "combustivel": "Gasolina"},
    {"modelo": "Chevrolet Tracker", "combustivel": "Gasolina"},
    {"modelo": "Volkswagen T-Cross", "combustivel": "Gasolina"},
    {"modelo": "Fiat Toro", "combustivel": "Diesel"}
]

PRECOS = {
    "Gasolina": (5.20, 6.50),
    "Etanol": (3.50, 4.80),
    "Diesel": (5.80, 7.20)
}

LITROS_RANGE = {
    "Gasolina": (25, 55),
    "Etanol": (25, 50),
    "Diesel": (60, 150)
}

def gerar_cpf():
    """Gera um CPF aleatório formatado"""
    n1 = random.randint(100, 999)
    n2 = random.randint(100, 999)
    n3 = random.randint(100, 999)
    n4 = random.randint(10, 99)
    return f"{n1}.{n2}.{n3}-{n4}"

def gerar_placa():
    """Gera uma placa Mercosul aleatória"""
    letras = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=3))
    num1 = random.randint(0, 9)
    letra = random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    num2 = random.randint(10, 99)
    return f"{letras}-{num1}{letra}{num2}"

def gerar_registro(id_num, data_base):
    """Gera um registro de abastecimento"""
    # Seleciona estado e cidade
    estado = random.choice(ESTADOS)
    cidade = random.choice(estado["cidades"])
    
    # Seleciona veículo e combustível compatível
    veiculo = random.choice(VEICULOS)
    tipo_combustivel = veiculo["combustivel"]
    
    # Gera valores
    min_preco, max_preco = PRECOS[tipo_combustivel]
    valor_litro = round(random.uniform(min_preco, max_preco), 2)
    
    min_litros, max_litros = LITROS_RANGE[tipo_combustivel]
    litros = round(random.uniform(min_litros, max_litros), 1)
    
    total_pago = round(valor_litro * litros, 2)
    
    # Gera data aleatória nos últimos 6 meses
    dias_atras = random.randint(0, 180)
    horas = random.randint(6, 22)
    minutos = random.randint(0, 59)
    data = data_base - timedelta(days=dias_atras, hours=horas, minutes=minutos)
    
    return {
        "id": id_num,
        "data": data.strftime("%Y-%m-%dT%H:%M:%S"),
        "posto": random.choice(POSTOS),
        "cidade": cidade,
        "uf": estado["uf"],
        "tipoCombustivel": tipo_combustivel,
        "valorLitro": valor_litro,
        "litros": litros,
        "totalPago": total_pago,
        "motorista": {
            "nome": random.choice(NOMES),
            "cpf": gerar_cpf()
        },
        "veiculo": {
            "placa": gerar_placa(),
            "modelo": veiculo["modelo"]
        }
    }

def gerar_db(num_registros=200):
    """Gera base de dados completa"""
    data_base = datetime.now()
    registros = [gerar_registro(i + 1, data_base) for i in range(num_registros)]
    
    # Ordena por data (mais recente primeiro)
    registros.sort(key=lambda x: x["data"], reverse=True)
    
    return {"abastecimentos": registros}

if __name__ == "__main__":
    print("Gerando 200 registros de abastecimentos...")
    db = gerar_db(200)
    
    with open("db.json", "w", encoding="utf-8") as f:
        json.dump(db, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Base de dados gerada com sucesso!")
    print(f"   Total de registros: {len(db['abastecimentos'])}")
    print(f"   Arquivo: db.json")
    
    # Estatísticas
    tipos = {}
    ufs = {}
    for reg in db["abastecimentos"]:
        tipo = reg["tipoCombustivel"]
        uf = reg["uf"]
        tipos[tipo] = tipos.get(tipo, 0) + 1
        ufs[uf] = ufs.get(uf, 0) + 1
    
    print(f"\n📊 Estatísticas:")
    print(f"   Combustíveis: {tipos}")
    print(f"   Estados com mais registros: {sorted(ufs.items(), key=lambda x: x[1], reverse=True)[:5]}")
