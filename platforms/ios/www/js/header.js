

/**
 * @return {string}
 */


let Header=()=> {

    let menuList=`<span class="menu_list"><ol class="items">
                  <li><span  class="itemsCharacters">&#9993;</span><span id="new_messages">1</span><span id="message">Message <span class="arrow_down" id="arrow_down">&darr;</span><hr class="underline_menuItems"></span></li>
                  <li><span class="itemsCharacters" id="speech_balloon">&#x1F4AC;</span><span id="new_chat">1</span><span id="message_chat">Chat<hr class="underline_menuItems"></span></li>
                  <li><span class="itemsCharacters" >&#128467</span><span id="events">Events<hr class="underline_menuItems"></span></li>
                      <li><span class="itemsCharacters" >&#128467</span><span id="events">Whizz Up<hr class="underline_menuItems"></span></li>
                  <li><span class="itemsCharacters" >&#128467</span><span id="events">Sprint<hr class="underline_menuItems"></span></li>
                  <li><span class="itemsCharacters" >&#128467</span><span id="events">Whizza Community<hr class="underline_menuItems"></span></li>
                  <li><span  class="itemsCharacters">⚙</span><span id="setting">Setting<hr class="underline_menuItems"></span></li>
                  <li><span  class="itemsCharacters">⛑</span><span id="help">Help<hr class="underline_menuItems"></span></li>
                  <li><span  class="itemsCharacters">&#9004;</span><span id="about">About<span class="arrow_up" id="arrow_up">&uarr;</span></span></li>
                  </ol>
                  </span>`;

    let header=`<header id="header_bar">
<span class="logo"> H<span class="elsdots">&elsdot;</span>bit</span><span id="whizza_img"> </span><span class="containment_menuItems_and_notification">
<span><img src="" id="message_image"  alt="message"></span><span><img alt="Me" src="" id="accountImage"></span> 
<span id="menu_items" ><span class="menu_items"> </span>${menuList}</span> </span>
  </header>`;


    return (header);


};

