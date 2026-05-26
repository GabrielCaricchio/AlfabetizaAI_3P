import google.generativeai as genai
from google.api_core import exceptions

def verificar_chave_api(api_key):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')

    try:
        # Teste minimalista: solicita apenas uma palavra para economizar tokens
        response = model.generate_content("Oi", generation_config={"max_output_tokens": 5})
        print("✅ Chave Ativa: A API respondeu com sucesso.")
        return True

    except exceptions.Unauthenticated:
        print("❌ Erro de Autenticação: A chave de API é inválida ou expirou.")
        return False
    except exceptions.ResourceExhausted:
        print("❌ Cota Esgotada: A chave funciona, mas você atingiu o limite de tokens/requisições.")
        return False
    except exceptions.PermissionDenied:
        print("❌ Permissão Negada: A chave não tem acesso ao modelo solicitado.")
        return False