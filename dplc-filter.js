/*
	dplc-filter
    Copyright (C) 2021 Gemeente Den Haag, Netherlands
    Developed by Jasper Vries
 
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
 
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
 
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

document.getElementById('preview').onclick = function() {
    //get textarea contents
    var dplc = document.getElementById('input').value;
    dplc = process_dplc(dplc);
    //write new contents to textarea
    document.getElementById('input').value = dplc;
 }

 document.getElementById('download').onclick = function() {
    //get textarea contents
    var dplc = document.getElementById('input').value;
    dplc = process_dplc(dplc);
    //offer file download
    download_file(dplc);
 }

 document.getElementById('file').addEventListener('change', open_file, false);

 function process_dplc(dplc) {
    //process text
    //remove comments
    if (document.getElementById('c-comments').checked == true) {
        dplc = dplc.replace(/\/*\*.*?\*\//gs, '');
    }
    //remove NR_us
    if (document.getElementById('c-NRus').checked == true) {
        //example:
        //X_us[fc08_1] = 379;  Y_us[fc08_1] = 145; NR_us[fc08_1] = fc08;
        dplc = dplc.replace(/X_us\[(.+?)]\s*=\s*(\d+?);\s*Y_us\[(.+?)]\s*=\s*(\d+?);\s*NR_us\[(.+?)]\s*=\s*(.+?);/g, '');
        //for rewrite use below, but this isn't supported by MobiMaestro either
        //dplc = dplc.replace(/X_us\[(.+?)]\s*=\s*(\d+?);\s*Y_us\[(.+?)]\s*=\s*(\d+?);\s*NR_us\[(.+?)]\s*=\s*(.+?);/g, 'X_us[$6] = $2;  Y_us[$6] = $4;');
    }
    //remove us*kopp*
    if (document.getElementById('c-uskopp').checked == true) {
        //example:
        //X_us[us504556kopp6] = 1349;	Y_us[us504556kopp6] = 263;
        dplc = dplc.replace(/X_us\[us(\d+?)kopp(\d+?)]\s*=\s*(\d+?);\s*Y_us\[us(\d+?)kopp(\d+?)]\s*=\s*(\d+?);/g, '');
    }
    //remove is*kopp*
    if (document.getElementById('c-iskopp').checked == true) {
        //example:
        //X_is[is711709kopp9] = 236;   Y_is[is711709kopp9] = 507;
        dplc = dplc.replace(/X_is\[is(\d+?)kopp(\d+?)]\s*=\s*(\d+?);\s*Y_is\[is(\d+?)kopp(\d+?)]\s*=\s*(\d+?);/g, '');
    }
    return dplc;
 }

 function download_file(content) {
    var a = document.createElement('a');
    var blob = new Blob([content], {type: 'text/plain'});
    var url = URL.createObjectURL(blob);
    a.setAttribute('href', url);
    a.setAttribute('download', 'dpl.c');
    a.click();
    a.remove();
 }

function open_file(event) {
    var file = event.target.files[0];
    if (!file) {
        return;
    }
    var filereader = new FileReader();
    filereader.onload = function(event) {
        var contents = event.target.result;
        document.getElementById('input').value = contents;
    };
    filereader.readAsText(file);
}
