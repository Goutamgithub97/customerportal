import { LightningElement } from "lwc";
import gi from "@salesforce/resourceUrl/IdeaImage";
import ps from "@salesforce/resourceUrl/shield";
import pi from "@salesforce/resourceUrl/Gear";
import ci from "@salesforce/resourceUrl/Profile";
import cp from "@salesforce/resourceUrl/Doc";
//import getCategory from '@salesforce/apex/getFAQ.getCategory';
import getTopic from "@salesforce/apex/getFAQ.getTopic";

export default class HelpCenterParent extends LightningElement {
  showFAQ = false;
  showAnswer = false;
  iconName = "utility:chevrondown";
  generalInfo;
  projectServices;
  processInformation;
  cancellationInfo;
  claimsProcess;
  currentTopicId = null;
  currentFAQId;
  categoryName;
  selectedTopicFAQs;
  navigationItems = [
    {
      label: "General Information",
      isExpanded: false,
      iconName: "utility:add",
      topics: [],
      faqs: []
    },
    {
      label: "Product & Services",
      isExpanded: false,
      iconName: "utility:add",
      topics: [],
      faqs: []
    },
    {
      label: "Process Information",
      isExpanded: false,
      iconName: "utility:add",
      topics: [],
      faqs: []
    },
    {
      label: "Cancellation Information",
      isExpanded: false,
      iconName: "utility:add",
      topics: [],
      faqs: []
    },
    {
      label: "Claims Process",
      isExpanded: false,
      iconName: "utility:add",
      topics: [],
      faqs: []
    },
    {
      label: "Technical Issues",
      isExpanded: false,
      iconName: "utility:add",
      topics: [],
      faqs: []
    }
  ];

  connectedCallback() {
    this.generalInfo = gi;
    this.projectServices = ps;
    this.processInformation = pi;
    this.cancellationInfo = ci;
    this.claimsProcess = cp;
  }

  handleTopicClick(event) {
    event.preventDefault();
    const topicId = event.currentTarget.dataset.id;
    console.log(topicId, this.navigationItems, this.categoryName);
    this.selectedTopicFAQs = this.navigationItems.find(obj => obj.label === this.categoryName).topics.find(obj => obj.Id === topicId).FAQs__r.map(function(e){return {...e,isExpand:false,iconName:'utility:chevrondown'}});
    
    console.log('selectedTopicsFaq===>>',this.selectedTopicFAQs)

      if (!this.showFAQ) {
        this.showFAQ = true;
      }
  }

  // @wire (getCategory) categoryName;

  fetchTopics(itemId) {
    getTopic({ categoryName: itemId }).then((result) => {
      // Update the navigationItems topics based on the fetched topics
      this.navigationItems = this.navigationItems.map((item) => {
        if (item.label === itemId) {
          item.topics = result;
          console.log('result===>',result )
        
        
          console.log('=======>',item.topics,item.faqs)
         } else {
          item.topics = [];
          
         }
         
         return item;
      });


    });
    
  }

  handleIconClick(event) {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.id;
    this.categoryName = itemId;
    this.navigationItems = this.navigationItems.map((item) => {
      if (item.label === itemId) {
        console.log("itemId---->" + itemId);
        console.log("item---->" + JSON.stringify(item));
        item.isExpanded = true;
        item.iconName = "utility:dash";
        this.fetchTopics(itemId);
        
      } 
   
      else {
        item.isExpanded = false;
        this.selectedTopicFAQs=[];
        item.iconName = "utility:add";
      }
      return item;
    });
  }

  handleChevronIcon(event) {
    event.stopPropagation();
    const faqId = event.currentTarget.dataset.id;
    const ise = event.currentTarget.dataset.ise;
    
    let topicF = this.selectedTopicFAQs;
    Object.assign(topicF.find(obj=>obj.Id === faqId),{isExpand:!JSON.parse(ise),iconName:event.target.iconName === 'utility:chevrondown' ? "utility:chevronup" : "utility:chevrondown"})

   this.selectedTopicFAQs = [...topicF];
  }

}
//==============================================================================================


// import { LightningElement, wire } from "lwc";
// import getTopicsWithFAQs from "@salesforce/apex/getFAQ.getTopicsWithFAQs";
// import { getPicklistValues } from "lightning/uiObjectInfoApi";
// import Category from "@salesforce/schema/Custom_Topic__c.Category__c";
// import gi from "@salesforce/resourceUrl/IdeaImage";
// import ps from "@salesforce/resourceUrl/shield";
// import pi from "@salesforce/resourceUrl/Gear";
// import ci from "@salesforce/resourceUrl/Profile";
// import cp from "@salesforce/resourceUrl/Doc";
// export default class HelpCenterParent extends LightningElement {
//   showFAQ = false;
//   iconName = "utility:chevrondown";
//   generalInfo;
//   projectServices;
//   processInformation;
//   cancellationInfo;
//   claimsProcess;
//   currentTopicId = null;
//   categoryName;
//   selectedTopicFAQs;
//   categoryPicklist

//   navigationItems = [
//     {
//       label: "General Information",
//       isExpanded: false,
//       iconName: "utility:add"
//     },
//     {
//       label: "Product & Services",
//       isExpanded: false,
//       iconName: "utility:add"
//     },
//     {
//       label: "Process Information",
//       isExpanded: false,
//       iconName: "utility:add"
//     },
//     {
//       label: "Cancellation Information",
//       isExpanded: false,
//       iconName: "utility:add"
      
//     },
//     {
//       label: "Claims Process",
//       isExpanded: false,
//       iconName: "utility:add"
//     },
//     {
//       label: "Technical Issues",
//       isExpanded: false,
//       iconName: "utility:add"
//     }
//   ];

//   @wire(getPicklistValues, {fieldApiName: Category}) 
//   getPicklistValue({data, error}){
//     if(data){
//       console.log(data);
//     }
//     else{
// if(error){
//   console.log(error);
// }
//     }
//   }

//   connectedCallback() {
//     this.generalInfo = gi;
//         this.projectServices = ps;
//         this.processInformation = pi;
//         this.cancellationInfo = ci;
//         this.claimsProcess = cp;
//         getTopicsWithFAQs().then((result)=>{
//           console.log(JSON.parse(JSON.stringify(result)));
//         }
          
//         )
        
//   }

//   handleTopicClick(event) {
//     event.preventDefault();
//     const topicName = event.currentTarget.dataset.name;
//     const categoryName = event.currentTarget.dataset.category;
    
//     const selectedTopic = this.navigationItems.find(
//       (item) => item.label === categoryName
//     ).topics.find((topic) => topic.topicName === topicName);
    
//     this.selectedTopicFAQs = selectedTopic.faqs.map((faq) => {
//       return { ...faq, isExpand: false, iconName: "utility:chevrondown" };
//     });

//     if (!this.showFAQ) {
//       this.showFAQ = true;
//     }
//   }

//   fetchTopics(itemId) {
//     getTopicsWithFAQs().then((result) => {
//       this.navigationItems = this.navigationItems.map((item) => {
//         if (item.label === itemId) {
         
//           item.topics = result.topics.map((topic) => topic.topicName);
//         } else {
//           item.topics = [];
//         }
//         return item;
//       });
//     });
//   }

//   handleIconClick(event) {
//     event.preventDefault();
//     const itemId = event.currentTarget.dataset.id;
//     this.categoryName = itemId;
//     this.navigationItems = this.navigationItems.map((item) => {
//       if (item.label === itemId) {
//         item.isExpanded = true;
//         item.iconName = "utility:dash";
//         this.fetchTopics(itemId);
//       } else {
//         item.isExpanded = false;
//         item.iconName = "utility:add";
//       }
//       return item;
//     });
//   }

//   handleChevronIcon(event) {
//     event.stopPropagation();
//     const faqId = event.currentTarget.dataset.id;
//     const isExpanded = event.currentTarget.dataset.isexpanded;
    
//     const topic = this.selectedTopicFAQs.find((faq) => faq.Id === faqId);
//     topic.isExpand = !JSON.parse(isExpanded);
//     topic.iconName =
//       topic.iconName === "utility:chevrondown"
//         ? "utility:chevronup"
//         : "utility:chevrondown";

//     this.selectedTopicFAQs = [...this.selectedTopicFAQs];
//   }
// }
