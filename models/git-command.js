class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){
        let changes = 0;
        if(this.working_directory.new_changes.length === 0){
            return `You have ${changes} change/s.\n`;
        }else{
            const newChanges = Object.keys(this.working_directory.new_changes);
            changes = newChanges.length;
            
            let statusStr = `You have ${changes} change/s.\n`;
            for(let pos = 0; pos < changes; pos++){
                statusStr += `${newChanges[pos]}`;
                if(pos !== changes - 1){
                    statusStr += '\n';
                }
            }
            return statusStr;
        }
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        else if(path_file === '.'){
            for (const path in modified_files) {
                if (modified_files.hasOwnProperty(path)) {
                    const file = modified_files[path];
                    this.staging.push(file);
                    delete modified_files[path];
                }
            }
        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;