

let Content={


    container:function () {

        let transportation_hive=`




            <div class="stations" id="sub_ecosystems" >

                <div class="stations_hive">

              <div class="transports"  >

                  <span  id="local_train" class="transportation_hub_right_arrow active transportation_hub"><span class="right_arrow">&rightarrow;</span>Trains</span>
                  <span id="walk" class="transportation_hub">Walk</span>
                  <span id="flight" class="transportation_hub">Flight</span>
                  <span id="Inter Countries" class="transportation_hub">Inter Countries </span>
                  <span id="Inter Continent" class="transportation_hub">Inter Continent </span>
                  <span id="bus" class="transportation_hub">Bus</span>
                  <span id="Taxi" class="transportation_hub">Taxi</span>
                  <span id="intercity" class="transportation_hub">Intercity</span>
                  <span id="Space" class="transportation_hub">Space</span>
                  <span id="Packing" class="transportation_hub">Packing</span>
                  <span id="scooter" class="transportation_hub">Scooter<span class="left_arrow">&leftarrow;</span></span>

              </div>
                </div>
            </div>


       `;
        let transportation_hub=`<div id="station_ecosystems">
<span id="local_train" class="transportation_hub"><span class="right_arrow">&rightarrow;</span>Trains</span><span id="walk" class="transportation_hub">Walk</span><span id="metro" class="transportation_hub">Metro</span><span id="metro" class="transportation_hub">Flight</span><span id="bus" class="transportation_hub">Bus</span><span id="Taxi" class="transportation_hub">Taxi</span><span id="intercity" class="transportation_hub">Intercity</span><span id="inter_country" class="transportation_hub">Intercountry</span><span id="continental" class="transportation_hub">Continental<span class="left_arrow">&leftarrow;</span></span>
</div>`;

        return `
<section id="content">


<span id="date_group">
<span class="date" id="date"> </span>
<span class="date" id="time"> </span>
</span>

<section id="input_contents">


    <form autocomplete="off">
        <fieldset id="content_fieldset">

           <legend>Search Journey </legend>
              <div   class="train_alternatives_th">
           <table>
          <tbody>

          <tr>

  
         <tr >

           <th  colspan="100%" id="station_ecosystems" >


          ${transportation_hive}
         </th>
         </tr>
             <tr>
        <th colspan="100%" style="background: white">
  
            <div class="align_content">
           <input id="from_position" class="from_and_to" placeholder="From " type="text" name="from">
               <div style="display: inline-block; width: 100%">
           <input type="text" class="from_and_to"  placeholder="To" name="where to" id="to_position">
             <input type="button"  id="search" value="Go" />
             </div>
               <fieldset id="content_fieldset_others">
          <legend>Other Alternative</legend>
          
          <div class="schedule_time" >
          <div>Now</div>
          <div>
          <input type="time" class="time"  id="now">
            </div>
          
               </div>
                <div class="schedule_time">
          <div>Leaving</div>
          <div>
          <input type="time" class="time"  id="now">
            </div>
          
               </div>
                <div class="schedule_time">
          <div>Arriving at</div>
          <div >
          <input type="time" class="time"  id="now">
            </div>
          
               </div>
          
               </fieldset>
                </div>   
 
             </th>
                </tr>
               <tr>
     
      </tr>
    </tbody>
</table>
<table id="time_table_departure">
<tbody>


    <tr>
      <th  id="other_alternatives_th_left_radius">
          Departure
         </th>
           <th>
               Time
         </th>
          
                    <th>
                  Train
                 </th>
                   <th id="other_alternatives_th_right_radius" >
                   Platform
                      </th>
                   </tr>
             
                  <tr hidden class='train_time_table'><td>"
                  </tr>
        



       </tr>
       
       

</tbody>
</table>
<fieldset id="map_fieldset">
<legend>Pin Point</legend>
<iframe id="inlineFrame"
    title="Inline Frame Example"
    width="100%"
    height="81%"
    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
    
   
</iframe>
</fieldset>

</div>

</fieldset>
</form>
</section>


  </section>
  
`;


    }


};




