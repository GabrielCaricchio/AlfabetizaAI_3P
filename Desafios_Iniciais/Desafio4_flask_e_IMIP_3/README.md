# Desafio 3 de Arquitetura de Software
Desafio de Arquitetura de software sobre sistema para ajudar com a alfabetização de crianças e adolescentes internados em ambientes hospitalares.

#### Turma: 3°P de SI (manhã)
#### Professor: Cloves Rocha
#### Matéria: Arquitetura de Software
#### Equipe:
- Daniel Willian da Silva  (01831927)
- Emanuelly Araujo Alves de Lima  (01794503)
- Gabriel Arruda Caricchio  (01824947)
- Hanna Peixoto Parente de Araujo  (01802318)
- Ingrid Motta Santos  (01834701)
- Pedro Henrique José  (0180325)
- Tarsílio Aureliano Soares Silva  (01803880)

---

###### Ferramentas utilizadas:
- Visual Studio Code;
- Extensões do Visual Studio Code:
 Color Highlight, DotENV, Error Lens, HTML CSS Support, Image preview, indent-rainbow, jinja, Live Share, Markdown Preview Enhanced, Material Icon, Python, Pylance, Python Debugger, Python Environments, Reload, TODO Highlight, Todo Tree, Project Manager, vscode-pdf, SQLite Viewer, Portuguese (Brasil) Language Pack for Visual Studio Code, Github Theme, Ayu, Git History;
- Git e github desktop;
- Gerenciador de pacotes UV;
- Discord (para video conferencias para colaboração).

###### Linguagens e bibliotecas / frameworks:
- Front-end: HTML 5 e CSS3 (com Bootstrap), e JavaScript;
- Back-end: Python 3.12.3 (com flask, openai e dotenv);
- IA: API da OPENAI (chat gpt);
- Banco de dados: SQL (SQLite).

##### Slide utilizado pela equipe :
- https://view.genially.com/69b4c55249561c5da797c05e/presentation-alfabetiza

##### Arquitetura utilizada no projeto:
![Logo](./slides/diagrama.jpeg)

---

### Requisitos:
    Python 3.12.3

### Bibliotecas e Frameworks utilizados
    flask flask-sqlalchemy dotevn openai

### Processo de instalação:
1. Criar ambiente virtual Python (venv)

Windows

    Criar: Abra o prompt de comando na pasta do projeto e digite:
    cmd

    python -m venv venv

    Ativar:
        CMD: venv\Scripts\activate.bat
        PowerShell: .\venv\Scripts\Activate.ps1
        Nota: Se o PowerShell bloquear a execução, use Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process antes. 

Linux / macOS

    Criar: Abra o terminal na pasta do projeto e digite:
    bash

    python3 -m venv venv

    Nota: Se necessário, instale o venv antes: sudo apt install python3-venv.
    Ativar:
    bash

    source venv/bin/activate

    O nome do ambiente, por exemplo (venv), aparecerá antes do prompt do terminal. 

2. Instalar dependencias usando o arquivo requirements.txt

        Para instalar bibliotecas Python usando um arquivo
        requirements.txt, utilize o comando pip install -r requirements.txt no seu terminal ou prompt de comando. Certifique-se de estar na pasta do projeto e com o seu ambiente virtual ativado para garantir a organização das dependências.

3. Reinicializar o vs code ou IDE utilizada

### Opção alternativa de instalação 
1.Instalação do gerenciador de pacotes UV

    Windows:
    pip install uv


    No macOS/Linux: 
    curl -LsSf https://astral.sh | sh

2. Reiniciar o vs code ou IDE utilizada

3. Sincronizar o projeto

        uv sync

### Para iniciar o sistema

    Dependendo do desafio, há na pasta ou um arquivo "main.py" ou um "run.py" , esses arquivos são os responsaveis por inicializar o sistema, basta dar play neles e o sistema começa a funcionar, logo em seguida basta clicar no link que aparecer no terminal e será direcionado para o site.

### Observação
    Dentro da pasta de prototipo terá uma subpasta ai nela crie um arquivo .env e coloque sua chave de API da OpenAI
    coloque desta maneira no arquivo .env : OPENAI_API_KEY = "sua chave de API aqui"