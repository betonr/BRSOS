# BRSOS - Aplicativo para cadastro de ocorrências
  * [Carlos Alberto Noronha](https://github.com/betonr)
  * [Christian de Oliveira](https://github.com/christiancob)
  * [Danilo Freire](https://github.com/danilocf)

## Telas do APP-BRSOS 

Imagens das telas em tamanhos maiores podem ser encontradas em `/public`

* Tela de Login:

![tela_login](https://github.com/betonr/BRSOS/blob/master/tela_login.jpeg) 

* Tela de Menu / Home:

![tela_menu](https://github.com/betonr/BRSOS/blob/master/tela_menu.jpeg)
  
## Trabalho da disciplina de programação para dispositivos móvies

### FUNCIONAMENTO
 * realiza a autenticação e/ou seu cadastro no App;
 * posteriormente poderá cadastrar e visualizar ocorrências no mapa

### TECNOLOGIAS UTILIZADAS
 * front - react-native com build para android e iphone (testados);
 * back - API REST com nodeJs
 * banco de dados - mongodb

### EXECUÇÃO das aplicações
 1) execute um servidor mongodb e crie uma database com o nome de 'brsos'

 2) execute a api de back
 ```
    git clone https://github.com/betonr/BRSOS.git
    cd BRSOS/back
    npm install
    npm run dev
 ```

 3) execute a aplicação nativa (front/BRSOS) de acordo com seu sistema operacional
 *obs: é necessario ter o react-native instalado e funcionando em seu computador
 ```
    react-native run-android
    react-native run-ios
 ```

### INSTALAÇÃO DAS .apks
 ... em breve
