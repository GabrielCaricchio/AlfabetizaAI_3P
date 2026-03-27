import os
import json
from openai import OpenAI

# Configuração para o LM Studio local
# Geralmente o LM Studio usa o sufixo /v1 no endpoint
client = OpenAI(
    base_url="http://localhost:1234/v1", 
    api_key="lm-studio"
)

def gerar_pergunta():
    try:
        # No LM Studio, usamos chat.completions.create
        response = client.chat.completions.create(
            model="qwen/qwen3.5-9b", # Certifique-se que o ID bate com o que está carregado no LM Studio
            messages=[
                {
                    "role": "system", 
                    "content": "Você é um gerador de questões de alfabetização para crianças de 5 a 9 anos. "
                               "Responda EXCLUSIVAMENTE em formato JSON."
                },
                {
                    "role": "user", 
                    "content": "Crie uma questão sobre letras ou sílabas. O JSON deve ter as chaves: "
                               "pergunta, resposta1, resposta2, resposta3, resposta4, resposta_certa. O valor da chave resposta_certa deve ser exatamente igual ao valor da chave com o valor correto, pois o valor da resposta_certa será usado para comparar com os outros valores do quiz no sistema python, e deixe o json o mais limpo possivel para evitar erros ao receber, e não passe nada além das chaves e valores correspondentes as chaves 6 especificadas"
                }
            ],
            temperature=0.7,
            # Algumas versões do LM Studio suportam forçar o formato JSON:
            # response_format={ "type": "json_object" } 
        )

        # Extraindo o conteúdo da mensagem
        conteudo = response.choices[0].message.content
        
        try:
            resposta_ai = json.loads(conteudo)
        except json.JSONDecodeError:
            # Caso a IA envie texto extra além do JSON, tentamos limpar
            print("Erro ao decodificar JSON direto. Tentando fallback.")
            return fallback_pergunta()

        return {
            "pergunta": resposta_ai.get("pergunta", "Qual a primeira letra de MAÇÃ?"),
            "opcoes": [
                resposta_ai.get("resposta1", "M"),
                resposta_ai.get("resposta2", "A"),
                resposta_ai.get("resposta3", "E"),
                resposta_ai.get("resposta4", "B")
            ],
            "correta": resposta_ai.get("resposta_certa", "M")
        }

    except Exception as e:
        print(f"Erro na conexão com LM Studio: {e}")
        return fallback_pergunta()

def fallback_pergunta():
    """Retorna uma pergunta padrão caso a IA falhe."""
    return {
        "pergunta": "Qual é a primeira letra da palavra BOLA?",
        "opcoes": ["B", "P", "D", "M"],
        "correta": "B"
    }