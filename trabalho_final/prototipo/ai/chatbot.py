import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega o .env localizado na pasta do arquivo chatbot.py
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

api_key = os.getenv("GEMINI_API_KEY") # Certifique-se de mudar no seu .env
genai.configure(api_key=api_key)

# Usamos o gemini-1.5-flash para gerar as questões de forma rápida e eficiente
model = genai.GenerativeModel('gemini-2.5-flash')

def gerar_pergunta():
    try:
        prompt = (
            "Você é um sistema de criação de questões para alfabetização de crianças e adolescentes. "
            "Você fará uma nova questão (cada questão deve perguntar sobre algo distinto, um novo tema e aumentando o nível de forma lúdica) "
            "curta para auxiliar crianças de 5 a 9 anos a aprenderem sobre letras, sílabas e palavras "
            "(as perguntas devem ser fáceis e intuitivas para essas crianças que estão começando a aprender, "
            "e que não têm boa capacidade de leitura e escrita). "
            "Sua resposta deve ser estritamente em formato JSON usando chave-valor, contendo exatamente estas 6 chaves: "
            "\"pergunta\", \"resposta1\", \"resposta2\", \"resposta3\", \"resposta4\", \"resposta_certa\". "
            "Em \"resposta_certa\", coloque exatamente o valor correto de uma das quatro respostas (não a chave, mas o próprio texto da resposta certa)."
        )
        
        # O Gemini aceita a configuração response_mime_type para garantir o retorno em formato JSON
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # Converte a resposta em formato JSON para um dicionário Python
        resposta_gemini = json.loads(response.text)
        
        return {
            "pergunta": resposta_gemini.get("pergunta", "Qual é a primeira letra da palavra MAÇÃ?"),
            "opcoes": [
                resposta_gemini.get("resposta1", "M"),
                resposta_gemini.get("resposta2", "A"),
                resposta_gemini.get("resposta3", "E"),
                resposta_gemini.get("resposta4", "B")
            ],
            "correta": resposta_gemini.get("resposta_certa", "M")
        }
    except Exception as e:
        print(f"Erro ao gerar pergunta com IA do Gemini: {e}")
        # Fallback question em caso de erro da API do Gemini ou erro de parsing
        return {
            "pergunta": "Qual é a primeira letra da palavra BOLA?",
            "opcoes": ["B", "P", "D", "M"],
            "correta": "B"
        }