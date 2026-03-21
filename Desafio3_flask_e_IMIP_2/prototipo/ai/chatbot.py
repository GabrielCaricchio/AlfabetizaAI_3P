import os #importa a biblioteca do sistema que será usada para manipular o arquivo .env
from openai import OpenAI #biblioteca do chat gpt para usar a API da IA no sistema
from dotenv import load_dotenv # biblioteca para pegar a chave de API do arquivo .env
load_dotenv()

#definindo o objeto/instancia com uso de modelo especifico do gpt,
# e o input do usuario (além de passar a chave de API para o sistema da OPENAI,
# e liberar o uso da API)
client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY"))

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

#avaliando o tipo de dado (pegando o dado em string e passando para dict, e salvando em uma variavel)
resposta_gpt = eval(response.output_text)

#pegando o valor de cada chave presente no dicionario(coleção contendo as informações enviadas pelo chat gpt)
pergunta_quiz = resposta_gpt["pergunta"]
resposta1_quiz = resposta_gpt["resposta1"]
resposta2_quiz = resposta_gpt["resposta2"]
resposta3_quiz = resposta_gpt["resposta3"]
resposta4_quiz = resposta_gpt["resposta4"]
resposta_certa_quiz = resposta_gpt["resposta_certa"]

#print(f"Apergunta é: {pergunta_quiz}")
#print(f"A opção 1 é: {resposta1_quiz}")
#print(f"A opção 2 é: {resposta2_quiz}")
#print(f"A opção 3 é: {resposta3_quiz}")
#print(f"A opção 4 é: {resposta4_quiz}")
#print(f"A resposta correta é: {resposta_certa_quiz}")

#print(resposta_gpt)

