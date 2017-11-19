var list = [
    {
        title: "吃饭打豆豆",
        isChecked:false,

    },
    { title: "睡觉",
      isChecked:true
    }
]

new Vue({
    el:".main",
    data: {
        list: list,
        todo:"",
        edtorTodos:"",
        beforeTitle:"",
    },
    computed:{    //返回计算有多少条任务
        noCheckLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        }
    },
    methods: {
        addTodo(){
           this.list.push({
          title:this.todo,
          isChecked:false,
           }); 
           this.todo="";
      },
       deleteTodo(todo){
               var index=this.list.indexOf(todo);
               this.list.splice(index,1);
           },
       edtorTodo(item){
           this.beforeTitle=item.title,
           this.edtorTodos=item
         },
       edtorTodoed(item){
          this.edtorTodos = '';
       },
        cancelTodo(item){
            item.title=this.beforeTitle,
            this.beforeTitle=''
       }
   },
   directives:{    /*自定义事件*/
        "focus":{
            update(el,binding){
                console.log(binding)
                if(binding.value){
                    el.focus();
                }
            }
        }

      }

})
