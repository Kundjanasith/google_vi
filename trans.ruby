def prepareChartData(data) {
    items = [];
    lines = data.split(/\r\n|\n/);

    lines.forEach(function(line,i){
         if(line.length > 0){
             var item =  line.split(','); 
             if(i > 0){
                 item[1] = parseFloat(item[1]);
                 item[2] = parseFloat(item[2]);
                 item[3] = parseInt(item[3]);   
             }
             items.push(item);
         }
    });
    return items;
}
