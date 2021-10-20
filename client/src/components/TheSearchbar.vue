<template>
  <section class="section searchbar">
    <div class="container">
      <b-field>
        <b-autocomplete size="is-medium"
        expanded
          v-model="searchQuery"
          placeholder="artist name"
          icon="magnify"
          @select="option => selected = option"
          @keyup.enter="onClickSearch"
        ></b-autocomplete>
        
      </b-field>
      <b-field>
        <b-autocomplete size="is-medium"
        expanded
          v-model="searchQuery2"
          placeholder="album name"
          icon="magnify"
          @keyup.enter="onClickSearch2"
        ></b-autocomplete>
        
      </b-field>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'TheSearchbar',
  data () {
    return {
      data: [],
      searchQuery: '',
      searchQuery2: '',
      selected: null
    }
  },
  props: {
    recentSearch: {
      type: Array,
      required: true
    },
    newSearchQuery: {
      type: String,
      required: true
    },
    settings: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.searchQuery = this.settings.initialSearchQuery
    this.onClickSearch()
  },
  watch: {
    searchQuery: {
      handler: _.debounce(function (val) {
        if (val === '') {
          this.$store.commit('CLEAR_SEARCH')
        } else {
          if (val !== this.newSearchQuery) {
            this.onClickSearch()
          }
        }
      }, 1000)
    },
    searchQuery2: {
      handler: _.debounce(function (val) {
        if (val === '') {
          //this.$store.commit('CLEAR_SEARCH')
          this.onClickSearch2()
        } else {
          if (val !== this.newSearchQuery2) {
            this.onClickSearch2()
          }
        }
      }, 1000)
    },
    newSearchQuery (val) {
      this.searchQuery = val
    },
    newSearchQuery2 (val) {
      this.searchQuery2 = val
    }
  },
  computed: {
    filteredDataArray () {
      return this.recentSearch.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) >= 0
        )
      })
    }
  },
  methods: {
    onClickSearch () {
      this.$emit('clickSearch', this.searchQuery)
    },
    onClickSearch2 () {
      this.$store.state.filteralbumsquery = this.searchQuery2
      //this.$store.dispatch('FILTER_ALBUMS_NAMES', this.searchQuery2)
      console.log("hellos")
      this.$emit('clickSearch2', this.searchQuery2)
    },
    onClickClearSearch () {
      this.searchQuery = ''
      this.$emit('clickClearSearch')
    }
  }
}
</script>

<style>
.searchbar {
  padding: 1rem 1.5rem!important;
  width: 100%;
  box-shadow: 0 0 70px 0 rgba(0, 0, 0, 0.3);
  background: #fff;
}
</style>
