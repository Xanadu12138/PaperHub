webpackJsonp([1],{"/KV2":function(t,e){},"/XEW":function(t,e){},"4dqn":function(t,e){},"6Ht8":function(t,e){},Cppq:function(t,e){},I73F:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("k5jX"),n=(a("/KV2"),a("7+uW")),o=a("mvHQ"),r=a.n(o),i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-navbar",{staticClass:"is-primary is-bold"},[a("template",{slot:"brand"},[a("b-navbar-item",{attrs:{tag:"router-link",to:{path:"/"}}},[t._v("\n      PaperHub\n    ")])],1),t._v(" "),a("template",{slot:"start"},[a("b-navbar-item",{on:{click:t.goHome}},[t._v("\n      我的论文\n    ")]),t._v(" "),a("b-navbar-item",{on:{click:t.goPublic}},[t._v("\n      公共论文\n    ")])],1),t._v(" "),a("template",{slot:"end"},[a("b-navbar-item",{attrs:{tag:"div"}},[a("router-view",{attrs:{name:"btn"}})],1)],1)],2)},staticRenderFns:[]};var l={name:"App",components:{"ph-navbar":a("VU/8")({name:"Navbar",components:{},methods:{goHome:function(){this.$router.push("/home").catch(function(){})},goPublic:function(){this.$router.push("/public").catch(function(){})}}},i,!1,function(t){a("s9IH")},"data-v-8a8aef06",null).exports},data:function(){return{}},methods:{saveState:function(){sessionStorage.setItem("state",r()(this.$store.state))}},created:function(){window.addEventListener("unload",this.saveState)}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("ph-navbar"),this._v(" "),e("router-view",{attrs:{name:"main"}})],1)},staticRenderFns:[]};var u=a("VU/8")(l,c,!1,function(t){a("pyZT")},null,null).exports,d=a("/ocq"),p=a("NYxO");n.a.use(p.a);var f=new p.a.Store({state:sessionStorage.getItem("state")?JSON.parse(sessionStorage.getItem("state")):{userInfo:{userStatus:!1,userID:""},adminInfo:{adminStatus:!1}},mutations:{setUserInfo:function(t,e){t.userInfo=e},clearUserInfo:function(t){t.userInfo.userStatus=!1,t.userInfo.userID=""},setAdminInfo:function(t,e){t.adminInfo=e},clearAdminInfo:function(t){t.adminInfo.adminStatus=!1}},actions:{},modules:{}}),b={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero is-fullheight-with-navbar is-primary"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"has-text-centered container is-fluid"},[e("h1",{staticClass:"title"},[this._v("欢迎使用 PaperHub")]),this._v(" "),e("h2",[this._v("基于Web的论文管理和分享平台")])])])])}]};var m=a("VU/8")({name:"Welcome"},b,!1,function(t){a("g5HW")},"data-v-59fd2d86",null).exports,h={name:"Navbar",components:{},data:function(){return{tableDataUser:[],tableDataPaper:[],userInfoList:[{id:0,userID:"123",password:"123456"},{id:0,userID:"123",password:"123456"},{id:0,userID:"123",password:"123456"},{id:0,userID:"123",password:"123456"},{id:0,userID:"123",password:"123456"}],paperInfoList:[{id:0,userID:"123",categoryName:"123456",title:"123",url:"123"},{id:0,userID:"123",categoryName:"123456",title:"123",url:"123"},{id:0,userID:"123",categoryName:"123456",title:"123",url:"123"},{id:0,userID:"123",categoryName:"123456",title:"123",url:"123"}],isUpdateModalActive:!1,passwordInModal:"",userSelected:null}},mounted:function(){this.retrieveUser(),this.retrieveAllPaper()},methods:{retrieveUser:function(){var t=this;this.$axios.get("/api/retrieveUser").then(function(e){t.userInfoList=e.data.msg,t.tableDataUser=[];for(var a=0;a<t.userInfoList.length;a++){var s={id:a+1,userID:t.userInfoList[a].userID,password:t.userInfoList[a].password};t.tableDataUser.push(s)}}).catch(function(t){console.log(t)})},retrieveAllPaper:function(){var t=this;this.$axios.get("/api/retrieveAllPaper").then(function(e){t.paperInfoList=e.data.msg,t.tableDataPaper=[];for(var a=0;a<t.paperInfoList.length;a++){var s={id:a+1,userID:t.paperInfoList[a].userID,categoryName:t.paperInfoList[a].categoryName,title:t.paperInfoList[a].title,url:t.paperInfoList[a].url};t.tableDataPaper.push(s)}}).catch(function(t){console.log(t)})},selectUser:function(t){this.userSelected=t,this.isUpdateModalActive=!0},deleteUser:function(t){var e=this,a=this.$qs.stringify({userID:t});this.$axios.post("/api/deleteUser",a).then(function(t){e.retrieveUser()}).catch(function(t){console.log(t)})},updateUser:function(){var t=this,e=this.$qs.stringify({userID:this.userSelected,password:this.passwordInModal});this.$axios.post("/api/updateUser",e).then(function(e){t.retrieveCategory(),t.passwordInModal="",t.isUpdateModalActive=!1}).catch(function(t){console.log(t)})}}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"is-fullheight-with-navbar"},[a("b-carousel",[a("b-carousel-item",{key:"carousel1"},[a("section",[a("b-table",{attrs:{data:t.tableDataUser,striped:!0}},[a("b-table-column",{attrs:{label:"序号",width:"140",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.id)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"用户名",width:"160",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.userID)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"密码",width:"160",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.password)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"编辑",width:"180",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-warning","icon-right":"refresh"},on:{click:function(a){return t.selectUser(e.row.userID)}}})]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"删除用户",width:"160",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-danger","icon-right":"delete"},on:{click:function(a){return t.deleteUser(e.row.userID)}}})]}}])})],1)],1)]),t._v(" "),a("b-carousel-item",{key:"carousel2"},[a("section",[a("b-table",{attrs:{data:t.tableDataPaper,striped:!0}},[a("b-table-column",{attrs:{label:"序号",width:"140",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.id)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"用户名",width:"160",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.userID)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"分类名",width:"160",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.categoryName)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"论文标题",width:"180",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.title)+"\n          ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"论文链接",width:"180",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.url)+"\n          ")]}}])})],1)],1)])],1),t._v(" "),a("b-modal",{attrs:{active:t.isUpdateModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isUpdateModalActive=e}}},[a("form",{attrs:{action:" "}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("修改个人信息")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"新密码"}},[a("b-input",{attrs:{required:""},model:{value:t.passwordInModal,callback:function(e){t.passwordInModal=e},expression:"passwordInModal"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.updateUser}},[t._v("修改")])],1)])])])],1)},staticRenderFns:[]};var _=a("VU/8")(h,v,!1,function(t){a("4dqn")},"data-v-7e4c1d3b",null).exports,g={name:"PublicTable",components:{},data:function(){return{curCategoryID:null,tableData:[],comments:[],isCreateModalActive:!1,commentInModal:""}},mounted:function(){this.curCategoryID=this.$route.query.id,this.retrieveComment()},methods:{retrieveComment:function(){var t=this,e="/api/retrieveComment?categoryID="+this.curCategoryID;this.$axios.get(e).then(function(e){t.comments=e.data.msg,t.tableData=[];for(var a=0;a<t.comments.length;a++){var s={id:a+1,content:t.comments[a].content,userID:t.comments[a].userID,date:t.comments[a].date};t.tableData.push(s)}}).catch(function(t){console.log(t)})},createComment:function(){var t=this,e=this.$qs.stringify({content:this.commentInModal,categoryID:this.curCategoryID});this.$axios.post("/api/createComment",e).then(function(e){t.commentInModal="",t.isCreateModalActive=!1,t.retrieveComment()}).catch(function(t){console.log(t)})}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("b-table",{attrs:{data:t.tableData}},[a("b-table-column",{attrs:{field:"original_title",label:"序号",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(e.row.id)+"\n    ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"评论",width:"1000"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(e.row.content)+"\n    ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"作者"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(e.row.userID)+"\n    ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(e.row.date)+"\n    ")]}}])})],1),t._v(" "),a("div",{staticClass:"hero"},[a("button",{staticClass:"button field is-primary",on:{click:function(e){t.isCreateModalActive=!0}}},[t._v("\n      添加评论\n    ")])]),t._v(" "),a("b-modal",{attrs:{active:t.isCreateModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isCreateModalActive=e}}},[a("form",{attrs:{action:" "}},[a("div",{staticClass:"modal-card",staticStyle:{width:"800px"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("新评论")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"内容"}},[a("b-input",{attrs:{maxlength:"1000",type:"textarea",required:""},model:{value:t.commentInModal,callback:function(e){t.commentInModal=e},expression:"commentInModal"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isCreateModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.createComment}},[t._v("新建")])],1)])])])],1)},staticRenderFns:[]};var I=a("VU/8")(g,y,!1,function(t){a("/XEW")},"data-v-398b0eb2",null).exports,C={data:function(){return{adminID:"",password:""}},methods:{login:function(){var t=this,e=this.$qs.stringify({adminID:this.adminID,password:this.password});this.$axios.post("/api/adminLogin",e).then(function(e){if(0==e.data.code){t.$store.commit("setAdminInfo",userInfo),t.$router.push("/adminpage"),t.adminID="",t.password=""}else alert("登录失败")}).catch(function(t){alert("登录异常"),console.log(t)})}}},w={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("div",{staticClass:"level"},[a("p",{staticClass:"level-item has-text-centered"},[a("b-field",[a("b-input",{attrs:{placeholder:"管理员用户名",size:"is-large",icon:"account",required:""},model:{value:t.adminID,callback:function(e){t.adminID=e},expression:"adminID"}})],1)],1)]),t._v(" "),a("div",{staticClass:"level"},[a("p",{staticClass:"level-item has-text-centered"},[a("b-input",{attrs:{placeholder:"管理员密码",size:"is-large",icon:"key",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)]),t._v(" "),a("b-field",{attrs:{grouped:"",position:"is-centered"}},[a("p",{staticClass:"control"},[a("button",{staticClass:"button is-primary",on:{click:t.login}},[t._v("登 录")])])])],1)},staticRenderFns:[]},M=a("VU/8")(C,w,!1,null,null,null).exports,D={name:"CategoriesTable",components:{},data:function(){return{tableData:[],categories:[],isCreateModalActive:!1,isUpdateModalActive:!1,categoryNameInModal:"",categorySelected:0}},mounted:function(){this.retrieveCategory()},methods:{retrieveCategory:function(){var t=this,e="/api/retrieveCategory?userID="+this.$store.state.userInfo.userID;this.$axios.get(e).then(function(e){t.categories=e.data.msg,t.tableData=[];for(var a=0;a<t.categories.length;a++){var s={id:a+1,categoryName:t.categories[a].categoryName,isPublic:t.categories[a].isPublic,categoryID:t.categories[a].categoryID};t.tableData.push(s)}}).catch(function(t){console.log(t)})},createCategory:function(t){var e=this,a=this.$qs.stringify({categoryName:this.categoryNameInModal,isPublic:"False"});this.$axios.post("/api/createCategory",a).then(function(t){e.categoryNameInModal="",e.isCreateModalActive=!1,e.retrieveCategory()}).catch(function(t){console.log(t)})},deleteCategory:function(t){var e=this,a=this.$qs.stringify({categoryID:t});this.$axios.post("/api/deleteCategory",a).then(function(t){e.retrieveCategory()}).catch(function(t){console.log(t)})},updateCategory:function(t,e,a){var s=this,n=this.$qs.stringify({categoryID:t,categoryName:e,isPublic:a});this.$axios.post("/api/updateCategory",n).then(function(t){s.retrieveCategory()}).catch(function(t){console.log(t)})},selectCategory:function(t){this.categorySelected=t,this.isUpdateModalActive=!0},changeName:function(){for(var t="False",e=0;e<this.tableData.length;e++)this.tableData[e].categoryID==this.categorySelected&&(t=this.tableData[e].isPublic?"True":"False");this.updateCategory(this.categorySelected,this.categoryNameInModal,t),this.categoryNameInModal="",this.isUpdateModalActive=!1},changeStatus:function(t){for(var e="False",a="",s=0;s<this.tableData.length;s++)this.tableData[s].categoryID==t&&(e=this.tableData[s].isPublic?"True":"False",a=this.tableData[s].categoryName);this.updateCategory(t,a,e)},enterCategory:function(t){this.$router.push({path:"/papers",query:{id:t}})}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"is-fullheight-with-navbar"},[a("b-table",{attrs:{data:t.tableData,striped:!0}},[a("b-table-column",{attrs:{field:"id",label:"序号",width:"100",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.id)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"categoryName",label:"分类",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.categoryName)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"进入分类",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-info","icon-right":"apps"},on:{click:function(a){return t.enterCategory(e.row.categoryID)}}})]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"是否公开",width:"140",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("section",[a("b-switch",{attrs:{type:"is-info"},on:{input:function(a){return t.changeStatus(e.row.categoryID)}},model:{value:e.row.isPublic,callback:function(a){t.$set(e.row,"isPublic",a)},expression:"props.row.isPublic"}})],1)]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"编辑名称",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-warning","icon-right":"refresh"},on:{click:function(a){return t.selectCategory(e.row.categoryID)}}})]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"删除",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-danger","icon-right":"delete"},on:{click:function(a){return t.deleteCategory(e.row.categoryID)}}})]}}])})],1),t._v(" "),a("div",{staticClass:"hero"},[a("button",{staticClass:"button field is-primary",on:{click:function(e){t.isCreateModalActive=!0}}},[t._v("\n      新建分类\n    ")])]),t._v(" "),a("b-modal",{attrs:{active:t.isCreateModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isCreateModalActive=e}}},[a("form",{attrs:{action:" "}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("新建分类")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"分类名字"}},[a("b-input",{attrs:{required:""},model:{value:t.categoryNameInModal,callback:function(e){t.categoryNameInModal=e},expression:"categoryNameInModal"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isCreateModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.createCategory}},[t._v("新建")])],1)])])]),t._v(" "),a("b-modal",{attrs:{active:t.isUpdateModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isUpdateModalActive=e}}},[a("form",{attrs:{action:" "}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("修改分类")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"分类名字"}},[a("b-input",{attrs:{required:""},model:{value:t.categoryNameInModal,callback:function(e){t.categoryNameInModal=e},expression:"categoryNameInModal"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.changeName}},[t._v("修改")])],1)])])])],1)},staticRenderFns:[]};var A=a("VU/8")(D,k,!1,function(t){a("xXxz")},"data-v-04430bb4",null).exports,S={name:"PublicTable",components:{},data:function(){return{tableData:[],categories:[]}},methods:{enterCategory:function(t){this.$router.push({path:"/publicpapers",query:{id:t}})},goAndQueryComments:function(t){this.$router.push({path:"/comments",query:{id:t}})}},mounted:function(){var t=this;this.$axios.get("/api/retrievePublicCategories").then(function(e){t.categories=e.data.msg,t.tableData=[];for(var a=0;a<t.categories.length;a++){var s={id:a+1,categoryName:t.categories[a].categoryName,categoryID:t.categories[a].categoryID,userID:t.categories[a].userID};t.tableData.push(s)}}).catch(function(t){console.log(t)})}},$={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("b-table",{attrs:{data:t.tableData,striped:!0}},[a("b-table-column",{attrs:{field:"id",label:"序号",width:"100",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.id)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"categoryName",label:"分类名",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.categoryName)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"userName",label:"创建人",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.userID)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"进入分类",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-info","icon-right":"apps"},on:{click:function(a){return t.enterCategory(e.row.categoryID)}}})]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"查看评论",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-warning"},on:{click:function(a){return t.goAndQueryComments(e.row.categoryID)}}},[t._v("...")])]}}])})],1)],1)},staticRenderFns:[]};var x=a("VU/8")(S,$,!1,function(t){a("ftH7")},"data-v-b1595cea",null).exports,q={name:"PapersTable",components:{},data:function(){return{curCategoryID:null,tableData:[],papers:[],isCreateModalActive:!1,isUpdateModalActive:!1,urlInModal:"",titleInModal:"",authorInModal:"",descriptionInModal:"",paperSelected:0}},mounted:function(){this.curCategoryID=this.$route.query.id,this.retrievePaper()},methods:{retrievePaper:function(){var t=this,e="/api/retrievePaper?categoryID="+this.curCategoryID;this.$axios.get(e).then(function(e){t.papers=e.data.msg,t.tableData=[];for(var a=0;a<t.papers.length;a++){var s={id:a+1,url:t.papers[a].url,title:t.papers[a].title,author:t.papers[a].author,description:t.papers[a].description,paperID:t.papers[a].paperID};t.tableData.push(s)}}).catch(function(t){console.log(t)})},createPaper:function(t){var e=this,a=this.$qs.stringify({categoryID:this.curCategoryID,url:this.urlInModal,title:this.titleInModal,author:this.authorInModal,description:this.descriptionInModal});this.$axios.post("/api/createPaper",a).then(function(t){e.urlInModal="",e.titleInModal="",e.authorInModal="",e.descriptionInModal="",e.isCreateModalActive=!1,e.retrievePaper()}).catch(function(t){console.log(t)})},deletePaper:function(t){var e=this,a=this.$qs.stringify({paperID:t});this.$axios.post("/api/deletePaper",a).then(function(t){e.retrievePaper()}).catch(function(t){console.log(t)})},selectPaper:function(t){this.paperSelected=t,this.isUpdateModalActive=!0},updatePaper:function(){var t=this,e=this.$qs.stringify({paperID:this.paperSelected,url:this.urlInModal,title:this.titleInModal,author:this.authorInModal,description:this.descriptionInModal});this.$axios.post("/api/updatePaper",e).then(function(e){t.retrievePaper(),t.urlInModal="",t.titleInModal="",t.authorInModal="",t.descriptionInModal="",t.isUpdateModalActive=!1}).catch(function(t){console.log(t)})}}},N={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"is-fullheight-with-navbar"},[a("b-table",{attrs:{data:t.tableData,striped:!0}},[a("b-table-column",{attrs:{field:"id",label:"序号",width:"100",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.id)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"url",label:"论文链接",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("a",{attrs:{href:e.row.url,target:"_blank"}},[t._v(t._s(e.row.url))])])]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"title",label:"标题",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.title)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"作者",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.author)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"描述",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.description)+" \n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"编辑名称",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-warning","icon-right":"refresh"},on:{click:function(a){return t.selectPaper(e.row.paperID)}}})]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"删除",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{attrs:{size:"is-small",type:"is-danger","icon-right":"delete"},on:{click:function(a){return t.deletePaper(e.row.paperID)}}})]}}])})],1),t._v(" "),a("div",{staticClass:"hero"},[a("button",{staticClass:"button field is-primary",on:{click:function(e){t.isCreateModalActive=!0}}},[t._v("\n          新增论文\n      ")])]),t._v(" "),a("b-modal",{attrs:{active:t.isCreateModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isCreateModalActive=e}}},[a("form",{attrs:{action:" "}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("新建论文")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"论文链接"}},[a("b-input",{attrs:{required:""},model:{value:t.urlInModal,callback:function(e){t.urlInModal=e},expression:"urlInModal"}})],1),t._v(" "),a("b-field",{attrs:{label:"标题"}},[a("b-input",{attrs:{required:""},model:{value:t.titleInModal,callback:function(e){t.titleInModal=e},expression:"titleInModal"}})],1),t._v(" "),a("b-field",{attrs:{label:"作者"}},[a("b-input",{attrs:{required:""},model:{value:t.authorInModal,callback:function(e){t.authorInModal=e},expression:"authorInModal"}})],1),t._v(" "),a("b-field",{attrs:{label:"描述"}},[a("b-input",{attrs:{required:""},model:{value:t.descriptionInModal,callback:function(e){t.descriptionInModal=e},expression:"descriptionInModal"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isCreateModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.createPaper}},[t._v("新建")])],1)])])]),t._v(" "),a("b-modal",{attrs:{active:t.isUpdateModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isUpdateModalActive=e}}},[a("form",{attrs:{action:" "}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("修改论文")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"论文链接"}},[a("b-input",{attrs:{required:""},model:{value:t.urlInModal,callback:function(e){t.urlInModal=e},expression:"urlInModal"}})],1),t._v(" "),a("b-field",{attrs:{label:"标题"}},[a("b-input",{attrs:{required:""},model:{value:t.titleInModal,callback:function(e){t.titleInModal=e},expression:"titleInModal"}})],1),t._v(" "),a("b-field",{attrs:{label:"作者"}},[a("b-input",{attrs:{required:""},model:{value:t.authorInModal,callback:function(e){t.authorInModal=e},expression:"authorInModal"}})],1),t._v(" "),a("b-field",{attrs:{label:"描述"}},[a("b-input",{attrs:{required:""},model:{value:t.descriptionInModal,callback:function(e){t.descriptionInModal=e},expression:"descriptionInModal"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isUpdateModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.updatePaper}},[t._v("修改")])],1)])])])],1)},staticRenderFns:[]};var U=a("VU/8")(q,N,!1,function(t){a("Cppq")},"data-v-c799f396",null).exports,P={name:"PublicPapersTable",components:{},data:function(){return{curCategoryID:null,tableData:[],papers:[]}},mounted:function(){this.curCategoryID=this.$route.query.id,this.retrievePaper()},methods:{retrievePaper:function(){var t=this,e="/api/retrievePaper?categoryID="+this.curCategoryID;this.$axios.get(e).then(function(e){t.papers=e.data.msg,t.tableData=[];for(var a=0;a<t.papers.length;a++){var s={id:a+1,url:t.papers[a].url,title:t.papers[a].title,author:t.papers[a].author,description:t.papers[a].description,paperID:t.papers[a].paperID};t.tableData.push(s)}}).catch(function(t){console.log(t)})}}},L={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"is-fullheight-with-navbar"},[a("b-table",{attrs:{data:t.tableData,striped:!0}},[a("b-table-column",{attrs:{field:"id",label:"序号",width:"100",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.id)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"url",label:"论文链接",centered:"",numeric:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("a",{attrs:{href:e.row.url,target:"_blank"}},[t._v(t._s(e.row.url))])])]}}])}),t._v(" "),a("b-table-column",{attrs:{field:"title",label:"标题",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.title)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"作者",width:"100",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.author)+"\n        ")]}}])}),t._v(" "),a("b-table-column",{attrs:{label:"描述",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.description)+" \n        ")]}}])})],1)],1)},staticRenderFns:[]};var R=a("VU/8")(P,L,!1,function(t){a("tkVp")},"data-v-60482f4a",null).exports,F={name:"LogoutBtn",methods:{logout:function(){this.$router.push("/"),this.$store.commit("clearUserInfo");this.$axios.post("/signOut").then(function(t){}).catch(function(t){console.log(t)}),document.cookie=""}}},E={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b-tag",{attrs:{type:"is-large is-primary"}},[this._v(this._s(this.$store.state.userInfo.userID))]),this._v(" "),e("button",{staticClass:"button",on:{click:this.logout}},[this._v("\n    注 销\n  ")])],1)},staticRenderFns:[]};var V=a("VU/8")(F,E,!1,function(t){a("6Ht8")},"data-v-12fa8a33",null).exports,H={name:"Btns",data:function(){return{userName:"",password:"",isRegisterModalActive:!1,isLoginModalActive:!1}},methods:{register:function(){var t=this,e=this.$qs.stringify({userID:this.userName,password:this.password});this.$axios.post("/signUp",e).then(function(e){0==e.data.code?(alert("注册成功"),t.isRegisterModalActive=!1,t.userName="",t.password=""):alert("注册失败")}).catch(function(t){alert("注册异常"),console.log(t)})},login:function(){var t=this;if(1!=this.$store.state.userInfo.userStatus){var e=this.$qs.stringify({userID:this.userName,password:this.password});this.$axios.post("/signIn",e).then(function(e){if(0==e.data.code){t.isRegisterModalActive=!1;var a={userStatus:!0,userID:t.userName};t.$store.commit("setUserInfo",a),t.$router.push("/home"),t.userName="",t.password=""}else alert("登录失败")}).catch(function(t){alert("登录异常"),console.log(t)})}else alert("已有用户登录")}}},z={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"buttons"},[a("b-button",{staticClass:"button is-info",on:{click:function(e){t.isRegisterModalActive=!0}}},[t._v("注 册")]),t._v(" "),a("b-button",{staticClass:"button is-light",on:{click:function(e){t.isLoginModalActive=!0}}},[t._v("登 录")]),t._v(" "),a("b-modal",{attrs:{active:t.isRegisterModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isRegisterModalActive=e}}},[a("form",{attrs:{action:""}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("注册")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"昵称"}},[a("b-input",{attrs:{type:"userName",required:""},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),t._v(" "),a("b-field",{attrs:{label:"密码"}},[a("b-input",{attrs:{required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isRegisterModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.register}},[t._v("注册")])],1)])])]),t._v(" "),a("b-modal",{attrs:{active:t.isLoginModalActive,"has-modal-card":"","trap-focus":"","aria-role":"dialog","aria-modal":""},on:{"update:active":function(e){t.isLoginModalActive=e}}},[a("form",{attrs:{action:""}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("登录")])]),t._v(" "),a("section",{staticClass:"modal-card-body"},[a("b-field",{attrs:{label:"昵称"}},[a("b-input",{attrs:{type:"userName",required:""},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),t._v(" "),a("b-field",{attrs:{label:"密码"}},[a("b-input",{attrs:{type:"password","password-reveal":"",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),a("b-checkbox",[t._v("记住我")])],1),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("b-button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.isLoginModalActive=!1}}},[t._v("关闭")]),t._v(" "),a("b-button",{staticClass:"button is-primary",on:{click:t.login}},[t._v("登录")])],1)])])])],1)},staticRenderFns:[]};var T=a("VU/8")(H,z,!1,function(t){a("ldvc")},"data-v-40073596",null).exports,W={name:"BackupBtn",methods:{backup:function(){this.$axios.post("/api/backupDB").then(function(t){alert("备份数据库成功")}).catch(function(t){console.log(t),alert("备份数据库失败")})},logout:function(){this.$router.push("/"),this.$store.commit("clearAdminInfo"),document.cookie=""}}},B={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b-tag",{attrs:{type:"is-large is-primary"}},[this._v("Admin")]),this._v(" "),e("button",{staticClass:"button",on:{click:this.backup}},[this._v("\n    备份数据库\n  ")]),this._v(" "),e("button",{staticClass:"button",on:{click:this.logout}},[this._v("\n    注 销\n  ")])],1)},staticRenderFns:[]};var O=a("VU/8")(W,B,!1,function(t){a("I73F")},"data-v-ee2d8926",null).exports;n.a.use(d.a);var X=[{path:"/",components:{main:m,btn:T},meta:{requireAuth:!1,requireAdmin:!1}},{path:"/home",components:{main:A,btn:V},meta:{requireAuth:!0,requireAdmin:!1}},{path:"/public",components:{main:x,btn:V},meta:{requireAuth:!0,requireAdmin:!1}},{path:"/papers",components:{main:U,btn:V},meta:{requireAuth:!0,requireAdmin:!1}},{path:"/publicpapers",components:{main:R,btn:V},meta:{requireAuth:!0,requireAdmin:!1}},{path:"/comments",components:{main:I,btn:V},meta:{requireAuth:!0,requireAdmin:!1}},{path:"/adminlogin",components:{main:M},meta:{requireAuth:!1,requireAdmin:!1}},{path:"/adminpage",components:{main:_,btn:O},meta:{requireAuth:!1,requireAdmin:!0}}],Q=new d.a({routes:X});Q.beforeEach(function(t,e,a){t.meta.requireAuth?1==f.state.userInfo.userStatus?a():(alert("请先登录"),a("/")):t.meta.requireAdmin?1==f.state.adminInfo.adminStatus?a():(alert("请先登录管理员账号"),a("/")):a()});var j=Q,J=a("mtWM"),K=a.n(J),Z=a("mw3O"),Y=a.n(Z);K.a.defaults.withCredentials=!0,K.a.defaults.baseURL="http://localhost:8000",n.a.prototype.$axios=K.a,n.a.prototype.$qs=Y.a,n.a.use(s.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:j,store:f,components:{App:u},template:"<App/>"})},ftH7:function(t,e){},g5HW:function(t,e){},ldvc:function(t,e){},pyZT:function(t,e){},s9IH:function(t,e){},tkVp:function(t,e){},xXxz:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f44736b39717f5d9b035.js.map