/**
 * View : The view represent the ViewerHub for all the component in the System
 */

let View={

  run:()=>{

//write Header on the screen align top
 document.write("header",Header());
//write content on the screen align middle
  document.write("content",Content.container());
//write footer on the screen align bottom
 document.write("footer",Footer());
  //document.write("footer",Footer());
      let resource=document.getElementById("message_image");
      resource.src='img/message.svg';

      let accountImageResource=document.getElementById("accountImage");
      accountImageResource.src='img/robot-512.png';

}};
View.run();
