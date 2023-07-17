// const fs = require("fs-extra");
// const pdf = require("pdfkit");
// const path = require('path');
// const moment = require("moment");
// const base64ToFile = async (base64, path, name) => {
//   return new Promise((resolve, _) => {
//     let filename = name + makeid(6);
//     const referencepath = "./uploads" + path;
//     let block = base64.split(";base64,");
//     let contentType = block[0].split(":")[1]; // In this case "audio/wav"
//     let extension = contentType.split("/");
//     const file_location = referencepath + "/" + filename + "." + extension[1];
//     const FinalPath = path + "/" + filename + "." + extension[1];
//     fs.emptyDir(referencepath)
//       .then(() => {
//         try {
//           fs.mkdir(referencepath, { recursive: true }, (err) => {
//             if (err) console.log(err);
//             fs.chmod(referencepath, 0777, (error) => {
//               if (error) console.log("Changed folder permissions error: " + error);
//             });
//           });
//           fs.writeFileSync(file_location, block[1], "base64");
//         } catch (err) {
//           console.log(err);
//           resolve({ ok: false, msg: "Error inesperado" });
//         }
//         fs.chmod(file_location, 0777, (error) => {
//           if (error) console.log("Changed file permissions error: " + error);
//         });

//         const responseData = {
//           status: "success",
//           finalpath: FinalPath,
//         };
//         resolve(responseData);
//       })
//       .catch((err) => {
//         console.log(err);
//         resolve({ ok: false, msg: "Error inesperado" });
//       });
//   });
// };

// const removeFolder = (path) => {
//   return new Promise((resolve, _) => {
//     // fs.chmod(`./uploads${path}`, 777)
//     fs.remove(`./uploads${path}`, (err) => {
//       if(err){
//         resolve({ ok: false, msg: "Error inesperado" })
//       }else{
//         resolve({ ok: true });
//       }
//     });
//   });
// };

const makeid = (length) => {
  var result = '';
  // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// function jumpLine(doc, lines) {
//   for (let index = 0; index < lines; index++) {
//     doc.moveDown();
//   }
// }
// const generarCertificado = async (course, user) =>{
//     const date = new Date() / 1;
//     const enlace = '/usuarios/'+user._id+'/certificados/'+course._id+'/'+date+'.pdf';
//     const P = new Promise(async (resolve, reject) => {
//       const ruta = path.join(__dirname, '../uploads/usuarios/'+user._id+'/certificados/'+course._id+'/'+date+'.pdf');
//       fs.mkdirSync('./uploads/usuarios/'+user._id+'/certificados/'+course._id, { recursive: true });
//       fs.chmodSync('./uploads/usuarios/'+user._id+'/certificados/'+course._id, 0777);
//       const doc = new pdf({
//         layout: 'landscape',
//         size: 'A4',
//       });
//       const file = fs.createWriteStream(ruta);
//       doc.pipe(file);
//       // Agregando una Imagen

//       const ruta2 = path.join(__dirname, "../assets/glon.png");
//       doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
//       const ruta0 = path.join(__dirname, "../assets/background.png");
//       doc.image(ruta0, 0, 0, {width: doc.page.width, height: doc.page.height});
//       doc.fontSize(10);
//       const font_url = path.join(__dirname, "../assets/fonts/basic.ttf");
//       const font_chinesse = path.join(__dirname, "../assets/fonts/chinesse.ttf");
//       doc.registerFont('basic', font_url);
//       const font = 'basic';

//       // Header
//       const maxWidth = 250;
//       const maxHeight = 150;
  
//       doc.image(ruta2, doc.page.width / 2 - maxWidth / 2, 60, {
//         fit: [maxWidth, maxHeight],
//         align: 'center',
//       });
  
//       jumpLine(doc, 8)
  
//       // Content
  
  
//       doc
//         .font(font)
//         .fontSize(18)
//         .fill('#5e5e5e')
//         .text("G-LON Technician Certificate", {
//           align: 'center',
//         });
  
//       jumpLine(doc, 2)
//       doc
//         .font(font)
//         .fontSize(26)
//         .fill('#d72e83')
//         .text(user.name.toUpperCase(), {
//           align: 'center',
//         });
  
          
//       jumpLine(doc, 2)
//       doc
//         .font(font_chinesse)
//         .fontSize(14)
//         .fill('#00000')
//         .text('展示了平台上教授的课程的知识', {
//           align: 'center',
//         });
//       doc
//         .font(font)
//         .fontSize(14)
//         .fill('#5e5e5e')
//         .text("has demonstrated the knowledge from course: "+course.title, {
//           align: 'center',
//         });
        
//       jumpLine(doc, 2)
//       // const ruta3 = path.join(__dirname, '../uploads/usuarios/'+user._id+'/certificados/'+course._id+'/qr.png')
//       //   doc.image(ruta3, 30, 240, {
//       //     fit: [200, 200],
//       //     align: 'center',
//       //   });
//         moment.locale('zh-cn')
//         doc
//           .font(font_chinesse)
//           .fontSize(14)
//           .fill('#00000')
//           .text('毕业于'+ moment().format("MMMM YYYY"), {
//             align: 'center',
//           });
          
//         moment.locale('en')
//         doc
//           .font(font)
//           .fontSize(14)
//           .fill('#5e5e5e')
//           .text('Granted by G-LON '+ moment().format("MMMM, YYYY"), {
//             align: 'center',
//           });

//         jumpLine(doc, 1);
//         // Validation link
//         // const linkWidth = doc.widthOfString(link)-105;
//         // const linkHeight = doc.currentLineHeight();
  
//         // doc
//         //   .link(
//         //     93, 470,
//         //     linkWidth,
//         //     linkHeight,
//         //     link,
//         //   );
  
//         // doc
//         //   .font(font)
//         //   .fontSize(6)
//         //   .fill('#021c27')
//         //   .text(
//         //     link,
//         //     93, 470,
//         //     linkWidth,
//         //     linkHeight
//         //   );

//         jumpLine(doc, 1);
//         // Signatures
//         // doc.fillAndStroke('#021c27');
//         // doc.strokeOpacity(0.2);
  
//         // Header
//         const maxWidth0 = 220;
//         const maxHeight0 = 100;
//         const ruta1 = path.join(__dirname, "../assets/end.png");
//         doc.image(ruta1, doc.page.width / 2 - maxWidth / 2, 490, {
//           fit: [maxWidth0, maxHeight0],
//           align: 'center',
//         });
//         doc.end();
//         file.on("finish", () => {
//           resolve('success');
//         });
//         file.on("error", reject);
//     });
//     return await P.then((msg) => { return { certificate: enlace } });
// }

module.exports = {
  // base64ToFile,
  // removeFolder,
  makeid,
  // generarCertificado,
}
