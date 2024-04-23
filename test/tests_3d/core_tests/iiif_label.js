var expect = require('chai').expect;
var should = require('chai').should();
var manifesto = require('../../../dist-commonjs/');



let manifestObj = {
  "@context": "http://iiif.io/api/presentation/4/context.json",
  "id": "https://example.org/iiif/3d/model_origin.json",
  "type": "Manifest",
  "label": { "en": ["english manifest"],
             "fr": ["french manifest"],
             "de": ["german manifest"] 
            },
  "summary": { "en": ["Viewer should render the model at the scene origin, and then viewer should add default lighting and camera"] },
  "items": [
    {
      "id": "https://example.org/iiif/scene1/page/p1/1",
      "type": "Scene",
      "label": { "en": ["A Scene"] },
      "items": [
        {
          "id": "https://example.org/iiif/scene1/page/p1/1",
          "type": "AnnotationPage",
          "items": [
            {
              "id": "https://example.org/iiif/3d/anno1",
              "type": "Annotation",
              "motivation": ["painting"],
              "body": {
                "id": "https://raw.githubusercontent.com/IIIF/3d/main/assets/astronaut/astronaut.glb",
                "type": "Model"
              },
              "target": "https://example.org/iiif/scene1/page/p1/1"
            }
          ]
        }
      ]
    }
  ]
}

let manifest ;

describe('label test', function() {

    it('parse text', function() {
            
            options = {
                "locale" : "fr"
            }
            
            manifest = manifesto.parseManifest(manifestObj, options);
            expect(manifest.getIIIFResourceType()).to.equal('manifest');
            
        });
    
    
    it('ask for english', function() {
         
            var label_text = manifest.getLabel().getValue("en");
            expect( label_text ).to.equal("english manifest");
        });
        
    it('ask for french', function() {
         
            var label_text = manifest.getLabel().getValue("fr");
            expect( label_text ).to.equal("french manifest");
        });
        
    it('ask for default', function() {
         
            var label_text = manifest.getLabel().getValue();
            expect( label_text ).to.equal("french manifest");
        });

});

