<template>
  <v-flex xs12 sm6 md6>
    <v-card tile>
      <v-card-media
        height="200"
        style="cursor: pointer"
        @click="onLoadLottery(lottery.id)"
        v-ripple
        :src="lottery.imageUrl"
      >
        <!--<img class="list-item__img" :src="lottery.imageUrl">-->
      </v-card-media>
      <v-card-text class="pa-2" style="font-size: 12px">
        <b>{{ lottery.name }}</b>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    props: ['lottery'],
    data () {
      return {
        id: this.lottery.id
      }
    },
    methods: {
      onLoadLottery (id) {
        this.$router.push('/lottery/' + id)
      }
    }
  }
</script>

<style>
  .card__media {
    background-color: gainsboro;
  }
  .card__media__background {
    background-position: top center !important;
  }
  /*.list-item__winners {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  /*}*/
  /*.list-item__status {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
  /*}*/
  /*.list-item__img {*/
    /*width: 120%;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
  /*}*/
</style>
