<template>
  <v-container>
    <v-layout>
      <v-flex xs12 lg8 offset-lg2>
        <v-card>
          <v-card-text>

            <h1>
              <v-icon large>mdi-file-document-box</v-icon>
              Правила участия в розыгрышах
            </h1>

            <p><u>Правильно указывайте почту!!</u></p>
            <p><u>Связь и призы получаете уведомлением по почте.</u></p>
			<p><b>ВНИМАНИЕ! ВЕГЛАС НА НОВОМ КАНАЛЕ. <a href="https://www.youtube.com/channel/UCratryukikrxQpXzhVXREVA" target="_blank" title="Веглас. Casino Streams 3.0">ССЫЛКА НА КАНАЛ</a>. ПОДПИСЫВАЙТЕСЬ!</b></p>

            <!-- <h4>пример</h4> -->
            <!-- <p>как правильно сделать скрины</p> -->

            <br>
			
			<img src="https://veglas.org/img/day_konkurs.jpg">
            <h3>ЕЖЕДНЕВНЫЙ РОЗЫГРЫШ: 500 рублей (1 победитель)</h3>
				<h4><u>Время проведения розыгрыша: </u></h4>
				<p>В 21:00 каждый день.</br> 
				       Розыгрыш проходит:</br>
				На канале <b>«Веглас. Casino Streams 3.0»</b> ( <a href="https://www.youtube.com/channel/UCratryukikrxQpXzhVXREVA" target="_blank" title="Веглас. Casino Streams 3.0">Перейти на канал "Веглас"</a> )<br>
				</p>
				
				<h4><u>Условия: </u></h4>
				<p>1. Выложить на сайт (<a href="https://app.veglas.org" target="_blank">https://app.veglas.org</a>) любой скрин на тематику КАЗИНО из любого онлайн казино с заносом от <b>Х50</b></br>
				2. В день можно выкладывать только один скрин.</p>
				<p><b>ВНИМАНИЕ:</b> В случае сомнения в правдоподобности скрина и того что он сделан с вашего акаунта, мы можем попросить расшарить экран в скайпе. Это делается для борьбы с фейками. Все фэйки будут удаляться и банится по IP.</p>
            <br>
			<hr>
			<br>

            <h3>ЕЖЕНЕДЕЛЬНЫЙ РОЗЫГРЫШ: 5 000 рублей (5 победителей) | 5 человек по 1000 рублей</h3>
			<h4><u>Время проведения розыгрыша: </u></h4>
				<p>В 21:00 каждое воскресенье.</br> 
				       Розыгрыш проходит:</br>
				На канале <b>«Веглас. Casino Streams 3.0»</b> ( <a href="https://www.youtube.com/channel/UCratryukikrxQpXzhVXREVA" target="_blank" title="Веглас. Casino Streams 3.0">Перейти на канал "Веглас"</a> )<br>
				</p>
			
				<h4><u>Условия: </u></h4>
				<p>1. Зарегистрироваться в одном из казино только по ссылке ниже и сделать депозит <b>от 600 рублей.</b></p>
				<p>  
				  <span v-for="i in CasinoLinks">
				    <a :href="i.url" target="_blank"><img :src="i.src"></a>&nbsp;&nbsp;
				  </span>
				</p>
				<p>
				2. Выложить на сайт (<a href="https://app.veglas.org" target="_blank">https://app.veglas.org</a>) скрин заноса от <b>Х100</b></br>
				3. Обязательно на скрине должен быть виден ваш НИК в казино и сумма заноса в слоте.</br>
				4. Количество скринов не ограниченно, только от <b>Х100</b> и более.</br>
				</p>
				<p><b>ВНИМАНИЕ:</b> В случае сомнения в правдоподобности скрина и того что он сделан с вашего акаунта, мы можем попросить расшарить экран в скайпе. Это делается для борьбы с фейками. Все фэйки будут удаляться и банится по IP.</p>
            <br>
			<hr>
			<br>
			
			<h3>ЕЖЕМЕСЯЧНЫЙ РОЗЫГРЫШ: Телефон Galaxy S9</h3>
            
				<h4><u>Время проведения розыгрыша: </u></h4>
				<p>В 21:00 каждый последний день месяца.</br> 
				       Розыгрыш проходит:</br>
				На канале <b>«Веглас. Casino Streams 3.0»</b> ( <a href="https://www.youtube.com/channel/UCratryukikrxQpXzhVXREVA" target="_blank" title="Веглас. Casino Streams 3.0">Перейти на канал "Веглас"</a> )<br>
				</p>
				
				<h4><u>Условия: </u></h4>
				<p>1. Зарегистрироваться в одном из казино только по ссылке ниже и сделать депозит <b>от 3000 рублей.</b></p>
				<p>  
				  <span v-for="i in CasinoLinks">
				    <a :href="i.url" target="_blank"><img :src="i.src"></a>&nbsp;&nbsp;
				  </span>
				</p>
				<p>
				2. Выложить на сайт (<a href="https://app.veglas.org" target="_blank">https://app.veglas.org</a>) скрин заноса от <b>Х200</b></br>
				3. Обязательно на скрине должен быть виден ваш НИК в казино и сумма заноса в слоте.</br>
				4. Количество скринов не ограниченно, только от <b>Х200</b> и более.</br>
				</p>
				<p><b>ВНИМАНИЕ:</b> В случае сомнения в правдоподобности скрина и того что он сделан с вашего акаунта, мы можем попросить расшарить экран в скайпе. Это делается для борьбы с фейками. Все фэйки будут удаляться и банится по IP.</p>
            <br>
			<hr>
			<br>
			
			<img src="https://veglas.org/img/mega_konkurs.jpg">
            <h3>МЕГА РОЗЫГРЫШ: 500 000 рублей</h3>
				<p><b>25 июня</b></p>
				<p><b>Информация и условия можно получить только по почте!</b></p>
            <br>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        CasinoLinks: [
		  {title: 'SuperSlots', url: 'http://bit.ly/2HQmbDv', src: 'https://veglas.org/img/superslots.jpg'},
          {title: 'SuperLines', url: 'http://bit.ly/2GMbqkL', src: 'https://veglas.org/img/superlines.jpg'},
          {title: 'Cleopatra', url: 'http://bit.ly/2ExzdHO', src: 'https://veglas.org/img/cleopatra.jpg'}
        ]
      }
    }
  }
</script>

<style>
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-bottom: 0.5em;
  }
</style>
