import os #importa a biblioteca do sistema que será usada para manipular o arquivo .env
from openai import OpenAI #biblioteca do chat gpt para usar a API da IA no sistema
from dotenv import load_dotenv # biblioteca para pegar a chave de API do arquivo .env
load_dotenv()

#definindo o objeto/instancia com uso de modelo especifico do gpt,
# e o input do usuario (além de passar a chave de API para o sistema da OPENAI,
# e liberar o uso da API)
client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY"))

import json

def gerar_pergunta():
    try:
        response = client.responses.create(
          model="gpt-5-nano",

          input="Você é um sistema de criação de questões para alfabetização de crianças e adolescentes," \
          "você fará uma nova questão(cada questão deve perguntar sobre algo distinto, um novo tema e aumentando nivel)" \
          "curta para auxiliar crianças de 5 a 9 anos a aprenderem sobre letras," \
          "silabas e palavras(as perguntas devem ser faceis e intuitivas para essas crianças que estão começando a aprender" \
          ",e que não tem boa capacidade de leitura e escrita)," \
          "sua resposta deve ser em formato json/dict usando chave valor, terão 6 chaves:" \
          "pergunta, resposta1, resposta2, resposta3, resposta4, resposta_certa." \
          "Em resposta_certa deve conter o valor correto (não pode ser a chave, tem que ser o valor)",

          store=True,
        )

        try:
            resposta_gpt = json.loads(response.output_text)
        except:
            resposta_gpt = eval(response.output_text)
            
        return {
            "pergunta": resposta_gpt.get("pergunta", "Qual é a primeira letra da palavra MAÇÃ?"),
            "opcoes": [
                resposta_gpt.get("resposta1", "M"),
                resposta_gpt.get("resposta2", "A"),
                resposta_gpt.get("resposta3", "E"),
                resposta_gpt.get("resposta4", "B")
            ],
            "correta": resposta_gpt.get("resposta_certa", "M")
        }
    except Exception as e:
        print(f"Erro ao gerar pergunta com IA: {e}")
        # Fallback question em caso de erro da API
        return {
            "pergunta": "Qual é a primeira letra da palavra BOLA?",
            "opcoes": ["B", "P", "D", "M"],
            "correta": "B"
        }
