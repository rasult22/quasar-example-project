<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div>
          <div class="text-h6">{{getAccount.name}}</div>
          <div class="text-subtitle2">Balance: {{getAccount.balance.toLocaleString('en-US')}} {{getAccount.currency}}</div>
        </div>
        <div class="q-mt-md" v-if="getAccount.hasDiffCurrency">
          <p class="text-subtitle2">Additional account</p>
          <p class="text-subtitle2">Balance: {{ getAccount.diffBalance.toLocaleString('en-US')   }} {{getAccount.diffCurrency}} </p>
        </div>
        <div></div>
      </q-card-section>
      <q-card-section>
        <p class="color-red">Total Spending: - 36.999 ₸</p>
        <p class="color-green">Total Income: + 62.250 ₸</p>
      </q-card-section>
    </q-card>
    <DropdownTable :operations="operations" />
    
    <OpearationForm />
  </q-page>
</template>

<script>
import OpearationForm from './OperationForm'
import DropdownTable from '../../components/DropdownTable'
import {mapGetters} from 'vuex'
export default {
  components: {
    OpearationForm,
    DropdownTable
  },
  computed: {
    ...mapGetters({
      getAccount: 'mainPage/getAccount',
      operations: 'mainPage/getOperations'
    })
  },
  data() {
    return {
    }
  },
  watch: {
    operations(val){
      console.log(val)

    }
  }

}
</script>
<style lang="scss" scoped>
.tr-income {
  //transform: scale(1);
  &::before {
    display: block;
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    left:5px;
    top: 5px;
    background:green;
    border-radius: 100%;
  }
}
.tr-expense {
  //transform: scale(1);
  &::before {
    display: block;
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    left:5px;
    top: 5px;
    background:red;
    border-radius: 100%;
  }
}
</style>
