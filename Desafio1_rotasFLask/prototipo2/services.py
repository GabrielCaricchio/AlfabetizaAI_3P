# Módulo para IA Generativa
# Simulação da Ia

import random

def criar_atividade(nome, serie):

    if serie == "1":
        atividades = [
            f"Complete com seu nome: __________ ama o céu.",
            f"Complete com seu nome: __________ viu o cacto.",
            f"Complete com seu nome: __________ gosta de suco."
        ]

    elif serie == "2":
        atividades = [
            f"{nome}, escreva uma frase sobre você.",
            f"{nome}, escreva uma frase usando a palavra 'vida'.",
            f"{nome}, escreva uma frase falando do seu animal favorito."
        ]

    elif serie == "3":
        atividades = [
            f"{nome}, escreva um pequeno texto sobre seu dia.",
            f"{nome}, conte uma história curta com começo, meio e fim.",
            f"{nome}, escreva 3 frases sobre o que você mais gosta de fazer."
        ]

    else:
        atividades = ["Série não encontrada."]

    return random.choice(atividades)