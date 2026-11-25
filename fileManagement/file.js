const fs = require('fs');
fs.writeFile('student.txt', 'Name: Rahul\nDepartment: Computer Engineering', (err) => {
    if (err) {
        console.log('Error writing file:', err);
        return;
    }

    console.log('File created successfully!');

    fs.readFile('student.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }

        console.log('\nFile Content:');
        console.log(data);

        fs.appendFile('student.txt', '\nName: Priya\nDepartment: IT', (err) => {
            if (err) {
                console.log('Error appending file:', err);
                return;
            }

            console.log('\nData appended successfully!');

            fs.readFile('student.txt', 'utf8', (err, updatedData) => {
                if (err) {
                    console.log('Error reading updated file:', err);
                    return;
                }

                console.log('\nUpdated File Content:');
                console.log(updatedData);

                fs.unlink('student.txt', (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                        return;
                    }

                    console.log('\nFile deleted successfully!');
                });
            });
        });
    });
});