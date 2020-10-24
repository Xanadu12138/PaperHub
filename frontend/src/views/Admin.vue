<template>
  <section class="is-fullheight-with-navbar">
    <b-table :data="tableData" :striped="true">
      <b-table-column
        field="id"
        label="用户ID"
        width="140"
        centered
        numeric
        v-slot="props"
      >
        {{ props.row.userID }}
      </b-table-column>

      <b-table-column
        label="用户名"
        width="160"
        centered
        numeric
        v-slot="props"
      >
        {{ props.row.username }}
      </b-table-column>

      <b-table-column label="密码" width="160" centered numeric v-slot="props">
        {{ props.row.password }}
      </b-table-column>

      <b-table-column label="编辑" width="180" centered v-slot="props">
        <b-button
          size="is-small"
          type="is-warning"
          icon-right="refresh"
          @click="modifyInfo(props.row.userID)"
        >
        </b-button>
      </b-table-column>

      <b-table-column label="删除用户" width="160" centered v-slot="props">
        <b-button
          size="is-small"
          type="is-danger"
          icon-right="delete"
          @click="deleteUser(props.row.userID)"
        ></b-button>
      </b-table-column>
    </b-table>
    <div class="hero">
      <button
        class="button field is-primary"
        @click="isCreateModalActive = true"
      >
        新建用户
      </button>
    </div>
    <!-- 新建用户信息模态框-->
    <b-modal
      :active.sync="isCreateModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">新建用户</p>
          </header>
          <section class="modal-card-body">
            <b-field label="用户名">
              <b-input v-model="userNameinModal" required></b-input>
            </b-field>
            <b-field label="密码">
              <b-input v-model="pwdinModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              class="button"
              type="button"
              @click="isCreateModalActive = false"
              >关闭</b-button
            >
            <b-button class="button is-primary" @click="createUser"
              >新建</b-button
            >
          </footer>
        </div>
      </form>
    </b-modal>
    <!-- 修改用户信息模态框-->
    <b-modal
      :active.sync="isUpdateModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">修改个人信息</p>
          </header>
          <section class="modal-card-body">
            <b-field label="用户名">
              <b-input v-model="userNameinModal" required></b-input>
            </b-field>
            <b-field label="新密码">
              <b-input v-model="pwdinModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              class="button"
              type="button"
              @click="isModalActive = false"
              >关闭</b-button
            >
            <b-button class="button is-primary" @click="updateUserInfo"
              >修改</b-button
            >
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
// import Info from '../components/navbar/Info'

export default {
  name: "Navbar",
  components: {
    // info: Info
  },
  data() {
    return {
      tableData: [],
      userInfoLists: [
        { userID: 1, userName: "abc", pwd: 123456 },
        { userID: 2, userName: "abc", pwd: 123456 },
        { userID: 3, userName: "abc", pwd: 123456 },
        { userID: 4, userName: "abc", pwd: 123456 },
        { userID: 5, userName: "abc", pwd: 123456 },
      ],
      isCreateModalActive: false,
      isUpdateModalActive: false,
      userNameinModal: "",
      pwdinModal: "",
      categorySelected: 0,
    };
  },
  mounted() {
    for (let i = 0; i < this.userInfoLists.length; i++) {
      const row = {
        userID: this.userInfoLists[i]["userID"],
        username: this.userInfoLists[i]["userName"],
        password: this.userInfoLists[i]["pwd"],
      };
      // console.log(row)
      this.tableData.push(row);
    }
  },
  methods: {
    modifyInfo(id) {
      this.categorySelected = id;
      this.isUpdateModalActive = true;
    },
    createUser() {
      const row = {
        userID: this.tableData.length + 1,
        username: this.userNameinModal,
        password: this.pwdinModal,
      };
      this.tableData.push(row);
      this.userNameinModal = "";
      this.pwdinModal = "";
      this.isCreateModalActive = false;
    },
    deleteUser(id) {
      // 过滤/删除对应元素
      this.tableData = this.tableData.filter((row) => row["userID"] != id);
    },
    updateUserInfo() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]["userID"] == this.categorySelected) {
          this.tableData[i]["username"] = this.userNameinModal;
          this.tableData[i]["password"] = this.pwdinModal;
        }
      }
      this.userNameinModal = "";
      this.pwdinModal = "";
      this.isUpdateModalActive = false;
    },
  },
};
</script>

<style scoped>
</style>
