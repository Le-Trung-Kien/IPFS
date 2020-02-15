//Size of Data
function countProperties(obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}


//Thu gọn tên
function showName(name) {
    if (name.length <= 30) {
        return name
    }
    else {
        let a = ''
        for (var i = 0; i <= 30; i++) {
            a = a + name[i]
        }
        return String(a + ' ...')
    }
}

// ToolBar - Add 
let Add10 = 0       //giá trị on off của add
function add() {
    let tab = document.getElementById('input')
    let background = document.getElementById('BackGround')
    if (Add10 == 0) { //hiện tab
        Add10 = 1
        tab.className = "unhide"
        document.getElementById("ButtonAdd").style.backgroundColor = "rgb(235, 235, 235)"
    }
    else {
        Add10 = 0
        tab.className = "hidden"
        hashText10 = 1
        hashText(hash)
        document.getElementById("ButtonAdd").style.backgroundColor = "buttonface"
    }
}

//ToolBar - add - text
let hashText10 = 0   // giá trị on off của hash
function hashText(hash) { // xử lý chỗ nhập hash
    if (hashText10 == 0) {    // đang hiện input điền hash
        document.getElementById("link").className = "hidden"
        document.getElementById("addLink").className = "hidden"
        document.getElementById("Hash").innerHTML = hash
        document.getElementById("Hash").style.display = "inline-block"
        hashText10 = 1
    }
    else {                 // đang hiện text hash
        document.getElementById("link").className = ""
        document.getElementById("addLink").className = ""
        document.getElementById("Hash").style.display = "none"
        hashText10 = 0
    }
}

// ToolBar - Add - Add
let hash = '' //hash của file
document.getElementById('link').placeholder = "Enter Hash"
document.getElementById('link').addEventListener('keydown', function (event) { // bấm enter để lưu 
    if (event.keyCode === 13) {
        addLink()
    }
})

// add File hoặc Folder vào left
function addFileFolder(Title, Hash, Size, Data, Tag, Count) {
    //hiện hash
    hashText10 = 0
    hashText(Hash)
    //thêm vào list
    let row = document.createElement("tr")
    row.setAttribute("class", "list")
    document.getElementById("Table").appendChild(row)
    let col0 = document.createElement('th')
    col0.setAttribute('class', 'Icon')
    let img = document.createElement('img')
    img.setAttribute('class', 'imgIcon')
    if (Tag == 'File') {
        img.setAttribute('src', 'https://img.icons8.com/pastel-glyph/30/000000/file.png')
        document.getElementById("data").innerText = Data


    }
    else if (Tag == 'Folder') {
        img.setAttribute('src', 'https://img.icons8.com/carbon-copy/30/000000/folder-invoices.png')
        document.getElementById("data").innerText = ''
        file[Count - 1].setAttribute('ondblclick', 'dblclickFolder(' + folder(folderNow)[0].Count + ')')
        //set dbclick cho folder
    }

    row.appendChild(col0)
    col0.appendChild(img)
    let col1 = document.createElement("th")
    col1.setAttribute('class', 'Name')
    row.appendChild(col1)
    col1.innerHTML = showName(Title)

    let col2 = document.createElement("th")
    col2.innerText = Size
    row.appendChild(col2)


    clickFile(Count, Tag)        //set click
    // đổi màu thể hiện file đạng chọn
    file[clickNow - 1].style.backgroundColor = "rgb(235, 235, 235)" //gỡ màu click trước
    file[Count - 1].style.backgroundColor = "rgb(89, 160, 226)"        //màu clicknow
    clickNow = Count
}

function TypeData(i, f) {        //phần tử thứ i folder f
    if (String(folder(f)[i][0]) == "undefined") {
        return 'File'
    }
    else {
        return 'Folder'
    }
}


// dblclickFolder thứ n
function dblclickFolder(n) {
    // xóa file đang hiển thị
    while (file.length > 0) {
        document.getElementById('Table').removeChild(file[0])
    }

    // thay đổi folderNow
    folderNow = folderNow + String(n)

    //Clicknow = 1
    clickNow = 1

    // hiển thị các file-folder của folder
    
    for (var i = 1; i < folder(folderNow).length; i++) {
        if (TypeData(i, folderNow) == 'File') {

            addFileFolder(folder(folderNow)[i].Title, folder(folderNow)[i].Hash, folder(folderNow)[i].Size, folder(folderNow)[i].Data, 'File', i)
        }
        else {
            addFileFolder(folder(folderNow)[i][0].Title, folder(folderNow)[i][0].Hash, folder(folderNow)[i][0].Size, folder(folderNow)[i][0].Data, 'Folder', i)
        }
    }

    file[0].click()
}


function addLink() {
    var hash = document.getElementById("link").value
    var request = new XMLHttpRequest()
    var url = String("https://gateway.ipfs.io/ipfs/" + hash)
    request.open('get', url, true)
    request.onload = function () {
        var data = this.response
        if (request.status >= 200 && request.status <= 400) { // lấy dữ liệu vào div "right"
            save(hash, hash, countProperties(data), data, 'File')
            addFileFolder(hash, hash, countProperties(data), data, 'File', folder(folderNow)[0].Count)
        }
        else {
            // const errorMess = document.createElement('marquee')
            // errorMess.textContent = 'ERROR'
            // document.getElementById('root').appendChild(errorMess)
        }
    }
    request.send()
}

//xác định 1 phần tử là file hay folder
let Icon = document.getElementsByClassName('imgIcon')
function Type(i) { //thuộc folder f và phần tử thứ i của folder
    if (Icon[i - 1].src == "https://img.icons8.com/carbon-copy/30/000000/folder-invoices.png") {
        return 'Folder'
    }
    else {
        return 'File'
    }
}


//click chuột chọn file đã đăng của list
let file = document.getElementsByClassName("list")
let clickNow = 1        // File đang click
function clickFile(i, Tag) {  //clickFile thứ i của list đồng thời dữ liệu là folder(folderNow)[i]
    file[i - 1].onclick = function () {
        hashText10 = 0
        hashText(folder(folderNow)[i].Hash)
        if (Tag == 'File') {
            document.getElementById("data").innerText = folder(folderNow)[i].Data
        }

        if (Tag == 'Folder') {
            document.getElementById("data").innerText = ''
        }

        file[clickNow - 1].style.backgroundColor = "rgb(235, 235, 235)" //gỡ màu click trước
        file[i - 1].style.backgroundColor = "rgb(89, 160, 226)"        //màu clicknow
        if (rename10 == 1 && i != clickNow) {       // nếu đang rename click file khác
            let change = document.getElementById('change')
            name[clickNow - 1].innerHTML = change.value
            folder(folderNow)[clickNow].Title = change.value
            body.onclick = function () { }
            rename10 = 0
        }
        clickNow = i
    }
}

// ToolBar - Delete
function del() {
    // xóa hiển thị
    document.getElementById('Table').removeChild(file[clickNow - 1])
    document.getElementById('data').innerHTML = ''
    hashText10 = 0
    hashText('')
    //xóa dữ liệu
    folder(folderNow).splice(clickNow, 1)
    folder(folderNow)[0].Count = folder(folderNow)[0].Count - 1
    for (var i = clickNow; i <= folder(folderNow)[0].Count; i++) {
        clickFile(i, Type(i))
    }

    clickNow = 1
    rename10 = 0
}

// ToolBar - Rename
let body = document.getElementsByTagName('body')[0]
// let body = document.getElementById('div')
let name = document.getElementsByClassName('Name')
let rename10 = 0 //on off cuar rename
let clickInput = 0  //xem click chuột có vào file ko
function rename() {
    //hiển thị
    if (rename10 == 0) {  //khi đang ko ở trạng thái rename()
        // Thay hiển thị
        name[clickNow - 1].innerHTML = ''
        let change = document.createElement('input')
        change.setAttribute('type', 'text')
        if (Type(clickNow) == 'File') {
            change.setAttribute('value', folder(folderNow)[clickNow].Title)
        }
        else {
            change.setAttribute('value', folder(folderNow)[clickNow][0].Title)
        }
        change.setAttribute('class', 'inputRename')
        change.setAttribute('id', 'change')
        name[clickNow - 1].appendChild(change)
        change.setAttribute('style', 'z-index: 20; background-color: white;')
        rename10 = 1
        // bấm enter để lưu 
        change.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                name[clickNow - 1].innerHTML = showName(change.value)
                if (Type(clickNow) == 'File') {
                    folder(folderNow)[clickNow].Title = showName(change.value)
                }
                else {
                    folder(folderNow)[clickNow][0].Title = showName(change.value)
                }
                rename10 = 0
            }
        })

        //Click ra ngoài ô để lưu
        body.onclick = function () { bodyClick() }
        function bodyClick() {          //click vào body => lưu giá trị đang nhập
            name[clickNow - 1].innerHTML = showName(change.value)
            if (Type(clickNow) == 'File') {
                folder(folderNow)[clickNow].Title = showName(change.value)
            }
            else {
                folder(folderNow)[clickNow][0].Title = showName(change.value)
            }
            rename10 = 0
            body.onclick = function () { }
        }
        // click vào khung chữ không bị nhận body.click
        change.onclick = function () {
            body.onclick = function () { }
            setTimeout(function () {
                body.onclick = function () { bodyClick() }
            }, 300)
        }

        //fix lỗi ấn nút rename ko nhận vì rename nhận lệnh body.onclick
        body.onclick = function () { }
        setTimeout(function () {
            body.onclick = function () { bodyClick() }
        }, 300)




    }
    // else if (rename10 == 1 && i == 1) {
    //     name[clickNow - 1].innerHTML = arr[clickNow].Title
    //     rename10 = 0
    // }
}


// ToolBar - Download
function download() {
    let Down = document.createElement('a')
    Down.setAttribute('href', '')
    Down.setAttribute('download', '')
    document.getElementById('Buttons').appendChild(Down)
    Down.href = 'data:text/plain; charset=utf-8,' + encodeURIComponent(folder(folderNow)[clickNow].Data)
    Down.download = folder(folderNow)[clickNow].Title
    Down.click()
}

// ToolBar - Upload
function uploadFile() {
    // Tạo file Upload
    let File = document.createElement('input')
    File.setAttribute('type', 'file')
    File.setAttribute('style', 'width: 0; height: 0')
    document.getElementById('Buttons').appendChild(File)
    File.click()
    //addFile
    let data = ''
    File.onchange = function () {    //lấy dữ liệu của file upload 
        var reader = new FileReader()
        reader.onload = function () {
            data = reader.result
            save(File.files[0].name, '', File.files[0].size, data, 'File')
            addFileFolder(File.files[0].name, '', File.files[0].size, data, 'File', folder(folderNow)[0].Count)
        }
        reader.readAsText(File.files[0])
    }
}

function upload() {
    uploadFile()
}



function createFolder() {
    save('', '', '', '', 'Folder')
    addFileFolder('', '', '', '', 'Folder', folder(folderNow)[0].Count)
    rename10 = 0
    rename()


}

function back() {
    // xóa hết các file ở folderNow đang hiển thị
    while (file.length > 0) {
        document.getElementById('Table').removeChild(file[0])
    }
    // chỉnh lại folderNow
    let a = ''
    for (var i = 0; i < folderNow.length - 1; i++) {
        a = a + folderNow[i]
    }
    folderNow = a
    clickNow = 1
    // hiện các file
    for (var i = 1; i < folder(folderNow).length; i++) {

        if (TypeData(i, folderNow) == 'File') {
            addFileFolder(folder(folderNow)[i].Title, folder(folderNow)[i].Hash, folder(folderNow)[i].Size, folder(folderNow)[i].Data, 'File', i)
        }
        else if (TypeData(i, folderNow) == 'Folder') {
            addFileFolder(folder(folderNow)[i][0].Title, folder(folderNow)[i][0].Hash, folder(folderNow)[i][0].Size, folder(folderNow)[i][0].Data, 'Folder', i)
        }
    }
    file[0].click()
}