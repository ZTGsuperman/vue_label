
/*设置本地存储*/
var store = {
        save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
},
        fetch(key){
            return JSON.parse(localStorage.getItem(key)) || [];
        }
}

/*var list = [
    {
        title: "吃饭打豆豆",
        isChecked:false,

    },
    { title: "睡觉",
      isChecked:true
    }
]
*/
var list = store.fetch("label");

var filter={
    all:function(list){
        return list;
    },
    finished:function(list){
        return list.filter(function(item){
            return item.isChecked;
        })
    },
    unfinished:function(list){
        return list.filter(function(item){
            return !item.isChecked;
        })
    }
}

var vm=new Vue({
        el:".main",
        data: {
            list: list,
            todo:"",
            edtorTodos:"",
            beforeTitle:"",
            visibility:"all"
        },
    watch:{
        list:{
            handler:function(){   ////监控list这个属性，当这个属性对应的值发生变化就会执行函数
                store.save("label",this.list);
            },
            deep:true    //对象内部的属性监听，也叫深度监听  
        }
    },
    computed:{    //返回计算有多少条任务
        noCheckLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        },
        filterList:function(){
            return filter[this.visibility]?filter[this.visibility](list):list
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
                if(binding.value){
                    el.focus();
                }
            }
        }

      }

})

function watchHashChange(){
     var hash=window.location.hash.slice(1)
     vm.visibility=hash
}
watchHashChange()
window.addEventListener("hashchange",watchHashChange)
