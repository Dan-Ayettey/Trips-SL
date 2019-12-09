

let Model={
      date:function(){
          return new Date()
      },

      xhrReadyCheck:{
          fail:"",
          success:"",
          progress:0,
          abort:false,
          loaded:false,
          xhrDone:false
      },


    getRequest:function(query) {
        if(XMLHttpRequest){

            this.xhr = new XMLHttpRequest();
            this.xhr.onload=(ev) => this.loadHandler(this.xhr);
            this.xhr.onabort=(ev) => this.abortHandler(this.xhr);
            this.xhr.onprogress=(ev) => this.progressHandler(this.xhr);

            this.xhr.onerror=(ev)=>this.netWorkFailureHandler(query) ;
            this.xhr.onreadystatechange=(ev) => this.onreadystatechangeHandler(this.xhr);
            this.xhr.open("GET",query,true);
            return this.xhr;
        }

    },

    postRequest:function(query) {
        if(XMLHttpRequest){

        this.xhr = new XMLHttpRequest();
        this.xhr.onload=(ev) => this.loadHandler(this.xhr);
        this.xhr.onabort=(ev) => this.abortHandler(this.xhr);
        this.xhr.onprogress=(ev) => this.progressHandler(this.xhr);

        this.xhr.onerror=(ev)=>this.netWorkFailureHandler(query) ;
        this.xhr.onreadystatechange=(ev) => this.onreadystatechangeHandler(this.xhr);
        this.xhr.open("POST",query,true);
        return this.xhr;
        }

    },

    netWorkFailureHandler(url){


            alert("Hmm. We’re having trouble finding that site.\n" +
                "\n" +
                "We can’t connect to the server at " +url+ ".\n" +
                "\n" +
                "If that address is correct, here are three other things you can try:\n" +
                "\n" +
                "    Try again later.\n" +
                "    Check your network connection.\n" +
                "    If you are connected but behind a firewall, check that Firefox has permission to access the Web.")


    },
    loadHandler:function(respond){

             if(respond.DONE){

                 this.xhrReadyCheck.loaded=true;

             }



    },
    progressHandler:function(ev) {

        if ([1, 2, 3].includes(ev.readyState)) {

            this.xhrReadyCheck.progress++;
        }
    },

    localStorage:function(key,value){
          this.storage=localStorage.setItem(key,value);
    },
    getLocalStorage:function(){
        return  this.storage;
    },
    abortHandler:function(ev){

        if(ev.aborted){

            this.xhrReadyCheck.abort=true;
        }

    },
    onreadystatechangeHandler(rep){

        if(rep.readyState===4 && rep.status===200) {

            this.xhrReadyCheck.xhrDone=true;

        } else if(rep.readyState===400){
            alert("unknown server error, I will try to resolve it")
        }


    },

    computeSent:()=>{
       return  this.xhr;
    },
    getHours() {
         return this.date().getHours().toLocaleString();
    },
    getMinutes() {
        return this.date().getMinutes().toLocaleString();
    },
    getSeconds() {
        return this.date().getSeconds().toLocaleString();
    },
    getMilliseconds() {
        return this.date().getMilliseconds().toLocaleString();
    },
    getFullYear(){
        return this.date().getFullYear();
    },
    getMonth(){
          return this.date().getMonth().toLocaleString();
    },
    getSystemDate() {
        return this.getFullYear()+"-"+
            this.getMonth().toLocaleString()+"-"
            +this.getDate().toLocaleString();
    },
    getDate(){
        return this.date().getDate().toLocaleString();
    },
    getSystemTime() {
        return this.getHours()+":"+this.getMinutes() +":"+this.getSeconds();
    },


    dateInstance(){
          return this.date();
    },





};

