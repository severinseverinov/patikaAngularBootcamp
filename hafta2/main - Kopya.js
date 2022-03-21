// Malzeme listesinin tanımlanması
var materials={
    Meatball:5,
    Lettuce:5,
    Pickle:5,
    Sauce:5,
    Onion:5,
    Tomato:5,
    Bread:5,
    Potato:5,
    Cola:5,
    Chicken:5,
};

//Menünün tanımlanması
const menus=[
    {id:0,meat:'Meatball',cookTime:'Over'},
    {id:1,meat:'Meatball',cookTime:'Medium'},
    {id:2,meat:'Meatball',cookTime:'Rare'},
    {id:3,meat:'Chicken',cookTime:'Medium'},
];

//İşlem listesinin  tanımlanması
const prossesList =[
    'Sipariş alındı.',
    'Malzeme Listesi kontrol edildi.',
    'Et türü kontrol edildi.',
    'Et pişirildi',
    'Hamburger hazırlandı.',
    'Patatesler kızartıldı.',
    'İçecek hazırlandı.',
    'Siparişler tepsiye kondu.',
    'Sipariş müşteriye teslim edildi.',
];

//Döngü kırmak için kullanılan değişken
let check=false;

//Malzeme listesi kontrol fonsiyonu
//Tüm malzemelerden varsa true malzeme eksiği varsa every komutu ile false döner
function checkMaterial(materials){
    return Object.values(materials).every(x=> x>0);
}

//İşlemlere göre hazırlama bekleme fonsiyonu
//yukarıda tanımlanmış işlem listesinden bir değer ve zaman değerini dışarıdan alır.
function handel(prosses,time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(console.log(prosses));
        },time);
    });
}

//hambuger (sandiviç) hazırlama fonsiyonu
//İstenen et ve pişme türüne göre pişme süreleri kontrol edilir ve pişirme işlemleri gerçekleştirilir.
//patates kızartma ve malzemelerin hazırlanması
async function prepare(menu){
    if(menu.meat=='Meatball'){
        if(menu.cookTime=='Over'){
            await handel(prossesList[3],4000);
        }else if(menu.cookTime=='Medium'){
            await handel(prossesList[3],3000);
        }else{
            await handel(prossesList[3],2000);
        }
    }else{
        await handel(prossesList[3],3000);
    }

    handel(prossesList[4],2000);
    handel(prossesList[5],5000);
    await handel(prossesList[6],2000);
}

//Kullanılan malzemelerin malzeme listesinden düşümü
function decreaseStock(menu,materials){
    Object.entries(materials).map((x) => {
        if (menu.meat == "Meatball") {
            materials[x[0]] -= 1;
            if (x[0] === "Chicken") {
                materials[x[0]]++;
            }
        } else {
            if (x[0] === "Meatball") {
                materials[x[0]]++;
            }
            materials[x[0]] -= 1;
        }
    });
}

//Genel siparişin yönetimi
//Malzeme stok kontrol
//Menü et türü kontrol
//Ürünlerin  tepsiye konması ve sipariş teslimi fonsiyonlarının çalıştırılması
//Malzeme yoksa kullanıcıya bildirilmesi
async function order(menu,materials){
    await handel(prossesList[0],1000);
    console.log('Order : '+menu.meat+' Menu -> '+menu.cookTime);
    await handel(prossesList[1],3000);
    if(checkMaterial(materials)){
        console.log('Stok var!');
        await handel(prossesList[2],1000);
        
        await prepare(menu);

        await handel(prossesList[7],1000);
        await handel(prossesList[8],1000);
        // console.log('-------Öncesi-----------');
        // console.log(materials);
        // decreaseStock(menu,materials);
        // console.log('-------Sonrası-----------');
        console.log(materials);
    }
    else{
        check=true;
        console.log('Stok bitti!');
    }
}

//Random olarak belirlenen menülerden menü seçimi 
//Menülerin hazırlanması ve malzemelerden bir tanesi bitene kadar  sonsuz döngüye sokulması.

async function start(){
    while(!check){
        let rnd=Math.floor(Math.random() * 4);
        //console.log(menus[rnd].meat+' '+menus[rnd].cookTime);
        await order(menus[rnd],materials);
    }
}

//programın çalıştırılması
start();