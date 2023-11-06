console.log("Hello world");


class PlantationAccordion {
    constructor(private _elements: HTMLElement[]) {

        this.bindAccordions();
    }

    bindAccordions () {
        for(const accordion of this._elements) {
            const header = this.$(accordion, '.plantation-options_header');
            if(!header) continue;

            header.addEventListener("mouseup", () => {
                accordion.classList.toggle('plantation-active');
            });
        }
    }

    $(element: HTMLElement, selector: string) {
        return element.querySelector(selector) as HTMLElement  | null;
    }
}

const accordions = Array.from(document.querySelectorAll('.plantation-options_item')) as HTMLElement[];
new PlantationAccordion(accordions);



class PlantationNotebook {
    constructor(private _element: HTMLElement) {
        
        this.bindNotebook();
    }

    bindNotebook () {
        // const header = this.$(notebook, '.plantation-options_header');
        const tabs = this._element.querySelector(".plantation-notebook_tabs") as HTMLElement | null;

        if (!tabs) return;

        (Array.from(tabs.children) as HTMLAnchorElement[]).forEach(element => {
            element.addEventListener("mousedown", () => {
                this.setActiveItem(element);
            });
        })
    }
    
    setActiveItem(active: HTMLAnchorElement | null) {
        const tabs = this._element.querySelector(".plantation-notebook_tabs") as HTMLElement | null;
        if (!tabs) return;
        
        let former_active : HTMLAnchorElement | null = null;
        const cls = "plantation-active";
        
        const children = Array.from(tabs.children) as HTMLAnchorElement[];
        
        children.forEach(child => {
            if(child.classList.contains(cls)) {
                former_active = child;
                
                child.classList.remove(cls);
            }
        })
        
        if (active) {
            if(!active.classList.contains(cls)) {
                active.classList.add(cls)
            }
        }
        
        if (former_active !== active) {
            if(active) {
                // const bodyItem = 
                const href = active.getAttribute("href");
                // active.classList.toggle(cls);
                // active.classList
                const activeBody = document.querySelector(href || "") as HTMLElement | null;
                if (activeBody) {
                    this.closePanes();
                    activeBody.classList.add(cls);
                }

                console.log("yes");
                
            }
        }
    }

    $(element: HTMLElement, selector: string) {
        return element.querySelector(selector) as HTMLElement  | null;
    }

    closePanes() {
        const panes = this._element.querySelector(".plantation-notebook_body") as HTMLElement | null;
        if (!panes) return;
        const cls = "plantation-active";
        
        const children = Array.from(panes.children) as HTMLElement[];
        
        children.forEach(child => {
            if(child.classList.contains(cls)) {
                child.classList.remove(cls);
            }
        })
    }
}


const notebooks = Array.from(document.querySelectorAll('.plantation-notebook')) as HTMLElement[];
notebooks.forEach(nb => {
    new PlantationNotebook(nb);
})