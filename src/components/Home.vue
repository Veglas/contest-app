<template>

    <v-container>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm4 offset-sm4 class="text-xs-center">

          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="150"
            color="amber"
          />

          <v-card>
            <v-card-media>
              <v-carousel
                v-if="!loading"
                class="my-carousel">
                  <v-carousel-item
                    v-for="i in items"
                    lazy
                    light
                    :src="i.imageUrl"
                    :key="i.id">
                      <div
                        class="my-carousel-bg-link"
                        v-ripple
                        @click="onLoadItem(i.id)"></div>
                  </v-carousel-item>
              </v-carousel>
            </v-card-media>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
  export default {
    computed: {
      items () {
        return this.$store.getters.loadedLastFewItems
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/contest/item/' + id)
      }
    }
  }
</script>

<style>
  .my-carousel {
    height: 220px;
  }
  .my-carousel-bg-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
</style>
