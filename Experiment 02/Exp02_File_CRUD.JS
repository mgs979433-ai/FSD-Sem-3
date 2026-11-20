const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'student.txt');

async function performCRUD() {
    try {
        // CREATE
        await fs.writeFile(filePath, 'Name: Mohammad Zunaid\nCourse: B.Tech CSE');
        console.log("File created successfully");

        // READ
        let data = await fs.readFile(filePath, 'utf8');
        console.log("\nFile Content:");
        console.log(data);

        // UPDATE
        await fs.writeFile(filePath, 'Name: Mohammad Zunaid\nCourse: Full Stack Development');
        console.log("\nFile updated successfully");

        // READ UPDATED DATA
        data = await fs.readFile(filePath, 'utf8');
        console.log("\nUpdated File Content:");
        console.log(data);

        // DELETE
        await fs.unlink(filePath);
        console.log("\nFile deleted successfully");

    } catch (error) {
        console.log("Error:", error.message);
    }
}

performCRUD();