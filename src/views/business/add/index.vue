<template>
  <div class="app-container">
    <el-form ref="dataForm" :model="temp" :rules="rules" label-width="120px">
      <el-form-item label="商户名称" prop="business_name">
        <el-input v-model="temp.business_name" style="width:400px;"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createData()" style="width:150px;">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createBusiness } from "@/api/business";
export default {
  data() {
    return {
      temp: {
        business_name: ""
      },
      rules: {
        business_name: [{ required: true, message: "请输入商户名称" }]
      }
    };
  },
  methods: {
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          console.log(tempData);
          createBusiness({
            business_name: tempData.business_name
          })
            .then(response => {
              console.log(response);
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success"
              });
              this.getList();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

