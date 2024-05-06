<template>
  <div>
    <div class="draftItem" v-for="(draftList,index) in allDrafts">
      <div class="msg">
        <div class="title">
          {{ draftList.draftName | ellipsis }}
        </div>
        <div class="writeTime">
          {{ draftList.createTime }}
        </div>
      </div>
      <div class="changeDraft">
        <button @click="getInfo(index)"><i class="el-icon-edit"></i>修改</button>
        <button @click="delDraft(draftList.draftId)" class=" deleteDraft"><i class="el-icon-delete"></i>删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from '@/utils/request.js'

export default {
  props: ['allDrafts'],
  methods: {
    getInfo(index) {
      this.$emit('goDraftEdit',this.$props.allDrafts[index])
      this.$emit('getDraftInfo', this.$props.allDrafts[index])
    },
    delDraft(draftId) {
      this.$confirm('此操作将永久删除该草稿, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('/strategy/delDraft',{
          params:{
            userId:JSON.parse(sessionStorage.getItem('userInfo')).userId,
            draftId:draftId
          }
        }).then((res)=>{
          // console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$emit('afterDel',res.data.drafts)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
  filters: {
    ellipsis(value){
      if(!value) return '';
      if (value.length > 7) {
            return value.slice(0,7) + '...'
          }
          return value
        
    }
  }
}
</script>

<style scoped>
.draftItem .msg {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.draftItem {
  padding: 10px 10px;
  height: 60px;
  /* background-color: pink; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  transition: 0.2s all linear;
  border-bottom: 1px dashed #999999;
}

.draftItem:hover {
  box-shadow: 0 0 5px gray;
}

.draftItem .title {
  font-size: 20px;
}

.draftItem .writeTime {
  color: #666666;
}

button {
  height: 40px;
  width: 60px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}

.deleteDraft {
  background-color: #f56c6c;
  border: 1px solid #f56c6c;
}

.deleteDraft:hover {
  background: #ff3131;
  border: 1px solid #ff3131;
}
</style>
