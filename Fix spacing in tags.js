    if (this.tags.includes("red") || !this.context) {
        return;
    }
    
    const getContextTag = (contexts) => {
        const ctx = contexts.join("\n");
        for (const tag of ["ptext", "glink", "pushlog", "tb_ptext_show"]) {
            if (ctx.includes(`/${tag}/`)) {
                return tag;
            }
        }
    };
    const contextTag = getContextTag(this.context);
    
    if (contextTag) {
        let pureText = this.cells[1].replaceAll("<br>", "").replaceAll("&nbsp;", " ");
        
        // Word Wrap
        if (contextTag === "ptext") {
            let wrappedText = "";
            let lineLength = 0;
            
            for (const word of pureText.split(" ")) {
                let futureLength = lineLength + word.length;
                if (lineLength > 0) {
                    futureLength += 1;
                }
                
                if (futureLength > 100) {
                    wrappedText += "\n";
                    lineLength = 0;
                    futureLength = word.length;
                }
                
                if (lineLength > 0) {
                    wrappedText += " ";
                }
                wrappedText += word;
                lineLength = futureLength;
            }
            pureText = wrappedText;
        }
        
        this.cells[2] = pureText.replaceAll(" ", "&nbsp;").replaceAll("\n", "<br>");
    }
