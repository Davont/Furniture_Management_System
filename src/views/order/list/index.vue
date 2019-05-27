<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        <strong>添加订单(模拟前台购买商品)</strong>
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="订单编号" prop="order_id" sortable="custom" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.order_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户账号" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.users_email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.users_address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数" align="center" width="120">
        <template slot-scope="{row}">
          <span
            v-if="row.orderGoodsNum"
            class="link-type"
            @click="handleFetchPv(row)"
            style="cursor:pointer; color:#409EFF;"
          >{{row.orderGoodsNum}} (详情)</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价钱" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.order_totals}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" class-name="status-col" width="120">
        <template slot-scope="{row}">
          <el-tag :type="row.order_status | statusFilter">{{row.order_status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            v-if="row.order_status!='已发货'"
            size="mini"
            type="success"
            :disabled="row.buttonDisabled"
            @click="handleModifyStatus(row,'已发货')"
          >已发货</el-button>
          <el-button
            v-if="row.order_status!='未发货'"
            size="mini"
            :disabled="row.buttonDisabled"
            @click="handleModifyStatus(row,'未发货')"
          >未发货</el-button>
          <el-button
            v-if="row.order_status!='退货中'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row,'退货中')"
          >退货中</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 800px; margin-left:50px;"
      >
        <el-form-item label="用户账号" prop="users_email">
          <el-input v-model="temp.users_email" placeholder="请输入"/>
        </el-form-item>

        <el-form-item label="所购商品">
          <el-select
            v-model="temp.orderGoods"
            multiple
            placeholder="请先选择商户"
            value-key="id"
            @change="orderPrice(temp.orderGoods)"
          >
            <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="总净额" prop="type">
          <span>
            ￥
            <span style="color:red;font-size:24px;">{{orderTotalPrice}}</span>
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData()">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="所购买的商品列表">
      <el-table :data="goodsData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="name" label="商品名称"/>
        <el-table-column prop="price" label="商品价格"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="returnOrder" title="退货原因">
      <el-form :rules="rules" :model="returnRows" ref="returnsForm">
        <el-form-item prop="returnReasons">
          <el-input v-model="returnRows.returnReasons" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnsSubmit()">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderList,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus
} from "@/api/order";
import {
  usersList,
  getUsers,
  updateUsersTotal,
  returnsUsersTotal
} from "@/api/user";
import {
  businessList,
  getBusiness,
  updateBusinessTotal,
  returnsBusinessTotal
} from "@/api/business";
import { goodsList } from "@/api/goods";
import { createReturns } from "@/api/returns";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { constants } from "fs";
export default {
  name: "Order",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        已发货: "success",
        未发货: "info",
        退货中: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      goodsList: [],
      orderTotalPrice: "",
      statusOptions: ["已发货", "未发货", "退货中"],
      returnOrder: false,
      temp: {
        id: undefined,
        orderGoods: []
      },
      dynamicValidateForm: {
        name: [""]
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "创建订单"
      },
      dialogPvVisible: false,
      goodsData: [],
      returnRows: {
        returnReasons: ""
      },
      rules: {
        users_email: [
          { required: true, message: "请输入用户账号", trigger: "change" }
        ],
        business_id: [
          { required: true, message: "请选择商户", trigger: "blur" }
        ],
        returnReasons: [
          { required: true, message: "请输入退款原因", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      orderList().then(response => {
        /* 获取订单数据*/
        this.list = response.data;
        this.total = response.data.length;
        usersList().then(response => {
          /* 获取用户数据*/
          let usersData = response.data;
          this.list.forEach(element => {
            this.$set(
              element,
              "orderGoodsNum",
              element.order_goods.goods.length
            );
            if (element.order_status == "退货中") {
              this.$set(element, "buttonDisabled", true);
            } else {
              this.$set(element, "buttonDisabled", false);
            }

            let index = usersData.findIndex(i => {
              return i.id == element.users_id;
            });
            if (index == -1) {
              this.$set(element, "users_email", "none");
              this.$set(element, "users_address", "none");
            } else {
              this.$set(element, "users_email", usersData[index].users_email);
              this.$set(
                element,
                "users_address",
                usersData[index].users_address
              );
            }
          });
          console.log(this.list);
          this.listLoading = false;
        });
      });
      goodsList().then(response => {
        let array = response.data;
        this.goodsList = [];
        array.forEach(element => {
          this.goodsList.push({
            name: element.goods_name,
            id: element.id,
            price: element.goods_price,
            business_id: element.business_id
          });
        });
      });
    },
    orderPrice(orderGoods) {
      let total = 0;
      orderGoods.forEach(element => {
        total += element.price;
      });
      this.orderTotalPrice = total;
    },
    returnsSubmit() {
      this.$refs["returnsForm"].validate(valid => {
        if (valid) {
          this.returnRows.buttonDisabled = true; /*只能退一次货 */
          let row = this.returnRows;
          console.log(row);
          status = "退货中";
          createReturns({
            order_id: row.id,
            returns_reason: row.returnReasons
          }).then(res => {
            updateOrderStatus({
              id: row.id,
              order_status: status
            }).then(res => {
              let array = row.order_goods.goods;
              array.forEach(element => {
                returnsBusinessTotal({
                  id: element.business_id,
                  returns_total: element.price
                }).then(res => {});
              });
              returnsUsersTotal({
                id: row.users_id,
                returns_total: row.order_totals
              }).then(res => {});
              if (res.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.returnOrder = false;
              } else {
                this.$message({
                  message: "操作失败",
                  type: "error"
                });
              }
              row.order_status = status;
            });
          });
        }
      });
    },
    handleModifyStatus(row, status) {
      if (status == "退货中") {
        this.returnOrder = true;
        this.returnRows = row;
        this.$nextTick(() => {
          this.$refs["returnsForm"].clearValidate();
        });
      } else {
        updateOrderStatus({
          id: row.id,
          order_status: status
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "操作失败",
              type: "error"
            });
          }
          row.order_status = status;
        });
      }
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.temp.orderGoods.length == 0) {
            this.$notify({
              title: "错误",
              message: "请选择商品",
              type: "error"
            });
          }
          getUsers(this.temp.users_email).then(res => {
            if (res.data == null) {
              this.$notify({
                title: "错误",
                message: "用户名不存在",
                type: "error"
              });
            } else {
              this.temp.id = res.data.id;
            }
            let jsonGoods = { goods: this.temp.orderGoods };
            createOrder({
              users_id: this.temp.id,
              order_status: "未发货",
              order_totals: this.orderTotalPrice,
              order_goods: jsonGoods
            }).then(res => {
              this.temp.orderGoods.forEach(element => {
                updateBusinessTotal({
                  id: element.business_id,
                  business_revenues: element.price
                }).then(res => {});
              });
              updateUsersTotal({
                id: this.temp.users_email,
                users_consumption: this.orderTotalPrice
              }).then(res => {});
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "创建订单成功",
                  type: "success"
                });
                this.getList();
              } else {
                this.$notify({
                  title: "失败",
                  message: "创建订单失败",
                  type: "error"
                });
              }
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    handleFetchPv(row) {
      this.goodsData = row.order_goods.goods;
      this.dialogPvVisible = true;
    }
  }
};
</script>
