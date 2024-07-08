/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6333333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "HomePage-0"], "isController": false}, {"data": [0.5, 500, 1500, "Alumini"], "isController": false}, {"data": [0.0, 500, 1500, "HomePage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Research"], "isController": false}, {"data": [1.0, 500, 1500, "Admissions-0"], "isController": false}, {"data": [0.5, 500, 1500, "Campuslife"], "isController": false}, {"data": [0.5, 500, 1500, "AboutUs-1"], "isController": false}, {"data": [0.5, 500, 1500, "Admissions-1"], "isController": false}, {"data": [0.5, 500, 1500, "Alumini-1"], "isController": false}, {"data": [1.0, 500, 1500, "AboutUs-0"], "isController": false}, {"data": [1.0, 500, 1500, "Alumini-0"], "isController": false}, {"data": [0.5, 500, 1500, "Admissions"], "isController": false}, {"data": [0.5, 500, 1500, "Onlinefee"], "isController": false}, {"data": [0.5, 500, 1500, "Research-1"], "isController": false}, {"data": [1.0, 500, 1500, "Research-0"], "isController": false}, {"data": [0.5, 500, 1500, "AboutUs"], "isController": false}, {"data": [1.0, 500, 1500, "Academics-0"], "isController": false}, {"data": [1.0, 500, 1500, "Campuslife-0"], "isController": false}, {"data": [0.5, 500, 1500, "Campuslife-1"], "isController": false}, {"data": [0.5, 500, 1500, "Career-1"], "isController": false}, {"data": [0.0, 500, 1500, "HomePage"], "isController": false}, {"data": [1.0, 500, 1500, "Career-0"], "isController": false}, {"data": [0.5, 500, 1500, "Academics"], "isController": false}, {"data": [1.0, 500, 1500, "Placements-0"], "isController": false}, {"data": [0.5, 500, 1500, "Academics-1"], "isController": false}, {"data": [0.5, 500, 1500, "Placements-1"], "isController": false}, {"data": [0.5, 500, 1500, "Placements"], "isController": false}, {"data": [0.5, 500, 1500, "Onlinefee-1"], "isController": false}, {"data": [1.0, 500, 1500, "Onlinefee-0"], "isController": false}, {"data": [0.5, 500, 1500, "Career"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 30, 0, 0.0, 609.0000000000001, 30, 1874, 641.5, 1017.1, 1784.8999999999999, 1874.0, 3.2758244158113126, 202.08530963365365, 0.5958758735531776], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["HomePage-0", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 158.0, 6.329113924050633, 4.913716376582278, 0.7540545886075949], "isController": false}, {"data": ["Alumini", 1, 0, 0.0, 623.0, 623, 623, 623.0, 623.0, 623.0, 623.0, 1.6051364365971108, 132.44256621187802, 0.4294993980738363], "isController": false}, {"data": ["HomePage-1", 1, 0, 0.0, 1712.0, 1712, 1712, 1712.0, 1712.0, 1712.0, 1712.0, 0.5841121495327103, 72.66377957067758, 0.06959148656542057], "isController": false}, {"data": ["Research", 1, 0, 0.0, 658.0, 658, 658, 658.0, 658.0, 658.0, 658.0, 1.5197568389057752, 129.41234090045592, 0.4393047112462006], "isController": false}, {"data": ["Admissions-0", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 30.0, 33.333333333333336, 26.822916666666668, 4.78515625], "isController": false}, {"data": ["Campuslife", 1, 0, 0.0, 991.0, 991, 991, 991.0, 991.0, 991.0, 991.0, 1.0090817356205852, 83.70845421291625, 0.2621247477295661], "isController": false}, {"data": ["AboutUs-1", 1, 0, 0.0, 535.0, 535, 535, 535.0, 535.0, 535.0, 535.0, 1.8691588785046729, 150.91815128504672, 0.27380257009345793], "isController": false}, {"data": ["Admissions-1", 1, 0, 0.0, 665.0, 665, 665, 665.0, 665.0, 665.0, 665.0, 1.5037593984962407, 176.18068609022555, 0.2158717105263158], "isController": false}, {"data": ["Alumini-1", 1, 0, 0.0, 591.0, 591, 591, 591.0, 591.0, 591.0, 591.0, 1.6920473773265652, 138.2753013959391, 0.22637743231810492], "isController": false}, {"data": ["AboutUs-0", 1, 0, 0.0, 43.0, 43, 43, 43.0, 43.0, 43.0, 43.0, 23.25581395348837, 18.781795058139537, 3.4066133720930236], "isController": false}, {"data": ["Alumini-0", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 31.0, 32.25806451612903, 25.516633064516128, 4.315776209677419], "isController": false}, {"data": ["Admissions", 1, 0, 0.0, 696.0, 696, 696, 696.0, 696.0, 696.0, 696.0, 1.4367816091954022, 169.48971803160921, 0.41251346982758624], "isController": false}, {"data": ["Onlinefee", 1, 0, 0.0, 979.0, 979, 979, 979.0, 979.0, 979.0, 979.0, 1.021450459652707, 82.74347229315629, 0.28129788049029625], "isController": false}, {"data": ["Research-1", 1, 0, 0.0, 625.0, 625, 625, 625.0, 625.0, 625.0, 625.0, 1.6, 134.959375, 0.23125], "isController": false}, {"data": ["Research-0", 1, 0, 0.0, 33.0, 33, 33, 33.0, 33.0, 33.0, 33.0, 30.303030303030305, 24.354876893939394, 4.379734848484849], "isController": false}, {"data": ["AboutUs", 1, 0, 0.0, 578.0, 578, 578, 578.0, 578.0, 578.0, 578.0, 1.7301038062283738, 141.08793793252596, 0.5068663494809689], "isController": false}, {"data": ["Academics-0", 1, 0, 0.0, 295.0, 295, 295, 295.0, 295.0, 295.0, 295.0, 3.389830508474576, 2.734375, 0.49324682203389836], "isController": false}, {"data": ["Campuslife-0", 1, 0, 0.0, 34.0, 34, 34, 34.0, 34.0, 34.0, 34.0, 29.41176470588235, 22.977941176470587, 3.820082720588235], "isController": false}, {"data": ["Campuslife-1", 1, 0, 0.0, 957.0, 957, 957, 957.0, 957.0, 957.0, 957.0, 1.0449320794148382, 85.86606909613376, 0.1357187173458725], "isController": false}, {"data": ["Career-1", 1, 0, 0.0, 958.0, 958, 958, 958.0, 958.0, 958.0, 958.0, 1.04384133611691, 83.11688576461378, 0.13149954331941546], "isController": false}, {"data": ["HomePage", 1, 0, 0.0, 1874.0, 1874, 1874, 1874.0, 1874.0, 1874.0, 1874.0, 0.5336179295624334, 66.7965623332444, 0.12715114727854857], "isController": false}, {"data": ["Career-0", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 30.0, 33.333333333333336, 26.041666666666668, 4.19921875], "isController": false}, {"data": ["Academics", 1, 0, 0.0, 1020.0, 1020, 1020, 1020.0, 1020.0, 1020.0, 1020.0, 0.9803921568627451, 105.51470588235294, 0.2853094362745098], "isController": false}, {"data": ["Placements-0", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 30.0, 33.333333333333336, 26.497395833333336, 4.58984375], "isController": false}, {"data": ["Academics-1", 1, 0, 0.0, 724.0, 724, 724, 724.0, 724.0, 724.0, 724.0, 1.3812154696132597, 147.53917040745856, 0.20097764157458564], "isController": false}, {"data": ["Placements-1", 1, 0, 0.0, 701.0, 701, 701, 701.0, 701.0, 701.0, 701.0, 1.4265335235378032, 114.41523270328103, 0.19642697931526393], "isController": false}, {"data": ["Placements", 1, 0, 0.0, 732.0, 732, 732, 732.0, 732.0, 732.0, 732.0, 1.366120218579235, 110.65573770491804, 0.3762167008196721], "isController": false}, {"data": ["Onlinefee-1", 1, 0, 0.0, 949.0, 949, 949, 949.0, 949.0, 949.0, 949.0, 1.053740779768177, 84.52153582718651, 0.14509516596417282], "isController": false}, {"data": ["Onlinefee-0", 1, 0, 0.0, 30.0, 30, 30, 30.0, 30.0, 30.0, 30.0, 33.333333333333336, 26.497395833333336, 4.58984375], "isController": false}, {"data": ["Career", 1, 0, 0.0, 988.0, 988, 988, 988.0, 988.0, 988.0, 988.0, 1.0121457489878543, 81.38383255313765, 0.25501328441295545], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 30, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
