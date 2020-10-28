<template>
  <div>
    <button class="button" @click="backup">
      备份数据库
    </button>
  </div>
</template>

<script>

export default {
  name: 'BackupBtn',
  methods: {
    backup () {
        this.$axios.post('/api/backupDB')
        .then(response => {
            alert('备份数据库成功')
        }).catch(err => {
            console.log(err)
            alert('备份数据库失败')
        })
    }
  }
}
</script>

<style scoped>

</style>
