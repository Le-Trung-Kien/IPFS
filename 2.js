//list phần tử của mỗi folder tượng trưng cho file. phần tử đầu tiên là thông tin của folder
let list = {
    "Title": "",
    "Hash": "",
    "Size": "",
    "Data": "",
    "Count": 0
}

// dữ liệu lưu dưới dạng arr. file lưu dưới dạng list, folder là arr bên trong chứa list
let arr = [list]


//folderNow được đánh dấu thể hiện vị trí của của các Folder mình đang chọn
//VD: folderNow = 325 tức folder ở vị trí: arr[3][2][5]
//trong mỗi folder, phần tử đầu tiên: [0] là thông tin dạng json của folder, còn lại là thông tin File/ 1Folder khác
let folderNow = ""





//folder tương ứng với  a = folderNow
function folder(a) {
    if (a === '') {
        return arr
    }
    else {
        let fol = arr
        for (var i = 0; i < a.length; i++) {
            fol = fol[a[i]]
        }
        return fol
    }
}


function save(Title, Hash, Size, Data, Tag) {
    folder(folderNow)[0].Count ++   //số phần tử trong folderNow +1
    if(Tag == 'File'){
        list = {Title, Hash, Size, Data, "Count": 0}
        folder(folderNow).push(list)
        list = {                    //reset data list
            "Title": "",
            "Hash": "",
            "Size": "",
            "Data": "",
            "Count": 0
        }
    }
    if(Tag == 'Folder'){
        folder(folderNow).push([])  //thêm [] - folder
        list = {Title, Hash, Size, Data, "Count": 0}
        folder(folderNow)[folder(folderNow)[0].Count].push(list) //thêm list - thông tin của folder thêm vào folder
        list = {                    //reset data list
            "Title": "",
            "Hash": "",
            "Size": "",
            "Data": "",
            "Count": 0
        }
    }

}

