import os
from dotenv import load_dotenv
from conection.api.gemini.GeminiAI import gerar_pergunta_gemini
from adapters.integrations.testetokem import verificar_chave_api

# Carrega o .env da pasta adapters
adapters_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(adapters_dir, '.env')
load_dotenv(dotenv_path)

#Vai solicitar a primeira IA que estiver disponivel (vai testar previamente se o token é valido e se consegue se comunicar com a IA, se não passa pro proximo modelo)
def gerar_pergunta():
    # 1. Tenta usar o Gemini
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key and gemini_key.strip() != "" and "sua-chave" not in gemini_key:
        if verificar_chave_api(gemini_key):
            try:
                print("InterfaceAI: Tentando gerar questão com o Gemini...")
                return gerar_pergunta_gemini()
            except Exception as e:
                print(f"InterfaceAI: Erro ao gerar com o Gemini(token invalido): {e}.")
    else:
        print("InterfaceIA: Sem chave válida para Gemini. Verifique o .env e a configuração da chave.")

    # 2. Fallback estático caso nenhuma API esteja ativa ou ocorram falhas
    print("InterfaceAI: Usando fallback estático por falta de chaves de API válidas.")
    return {
        "pergunta": "Qual é a primeira letra da palavra BOLA?",
        "opcoes": ["B", "P", "D", "M"],
        "correta": "B"
    }
