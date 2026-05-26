import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

def gerar_pergunta_gemini():
    # Caminho do .env na pasta adapters
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    load_dotenv(os.path.join(BASE_DIR, 'adapters', '.env'))

    api_key_gemini = os.getenv("GEMINI_API_KEY")
    if not api_key_gemini or "sua-chave" in api_key_gemini or api_key_gemini.strip() == "":
        raise ValueError("GEMINI_API_KEY não configurada ou vazia")

    genai.configure(api_key=api_key_gemini)
    model = genai.GenerativeModel('gemini-2.5-flash')

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

    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )

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
