<template>

    <section class="panel panel-vertical">
        <button  @click.stop="exportData()"> <i class="icon-arrow-down2"></i>Export Data</button>
        <p>
            You can download your data and import them back into the app. When you are using differnt browser, exporting 
            the data could help you transfer your data.
        </p>
        
        <strong>Import Data</strong>
        <p> Drag exported data to restore records </p>
        <div class="panel dropzone" @dragover.prevent @drop="importData">
            <span>Upload dataset by dragging file</span>
        </div>
        
    </section>
</template>

<style lang="scss" scoped>

p{
    max-width: 75ch;
    text-align: center;
}
.dropzone{
    // max-width: 500px ;
    width: 80%;
    min-height: 400px;
    // display: flex;
    // flex-direction: column;
    // align-self: center;
    // justify-content: center;
    background-color: beige;
    // background-color: azure;
    // background-color: antiquewhite;
    border-style: dashed;
    border-color: rgba(0,0,0,.1);
}
</style>

<script setup>
import download from "downloadjs"
import Dexie from 'dexie'
import "dexie-export-import";

let db = new Dexie("fitness");
db.version(1).stores({
    foodRecord: "&date" 
});

db.open().catch(function (e) {
    console.error("Open failed: " + e.stack);
})

function progressCallback ({totalRows, completedRows}) {
    console.log(`Progress: ${completedRows} of ${totalRows} rows completed`);
}

let exportData = async()=>{
    

    try {
        const blob = await db.export({prettyJson: true, progressCallback});
        download(blob, "tracker database.json", "application/json");
    } catch (error) {
        console.error(''+error);
    }
}

let importData = async ev => {
    ev.stopPropagation();
    ev.preventDefault();

    // Pick the File from the drop event (a File is also a Blob):
    const file = ev.dataTransfer.files[0];
    try {
      if (!file) throw new Error(`Only files can be dropped here`);
      console.log("Importing " + file.name);
      await db.delete();
      db = await Dexie.import(file, {
        progressCallback
      });
      console.log("Import complete");
    } catch (error) {
      console.error(''+error);
    }
}

// Configure dropZoneDiv
// dropZoneDiv.ondragover = event => {
//     event.stopPropagation();
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'copy';
//   };

  // Handle file drop:
// dropZoneDiv.ondrop = async ev => {
//     ev.stopPropagation();
//     ev.preventDefault();

//     // Pick the File from the drop event (a File is also a Blob):
//     const file = ev.dataTransfer.files[0];
//     try {
//       if (!file) throw new Error(`Only files can be dropped here`);
//       console.log("Importing " + file.name);
//       await db.delete();
//       db = await Dexie.import(file, {
//         progressCallback
//       });
//       console.log("Import complete");
//       await showContent();
//     } catch (error) {
//       console.error(''+error);
//     }
//   }


</script>