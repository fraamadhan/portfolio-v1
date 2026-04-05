export type Translation = {
  navbar: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    testimonials: string;
    contact: string;
    dashboard: string;
  };

  landing_page_description: string;
  landing_page_motto: string;
  about_section: {
    title: string;
    intro: {
      before_highlight: string;
      highlight_one: string;
      middle: string;
      highlight_two: string;
      after_highlight: string;
    };
    stack: string;
    hobbies: string;
    closing: string;
    buttons: {
      view_resume: string;
      download_resume: string;
      favorites: string;
    };
  };
  current_professional_status: string;
  view_projects: string;
  contact_me: string;
  work_based_in: string;
  status: string;
  current_role: string;
  skills_section: {
    expertise_tech_stack: string;
    description: string;
  };
  skills_cards: {
    backend: {
      title: string;
      description: string;
    };
    frontend: {
      title: string;
      description: string;
    };
    devops: {
      title: string;
      description: string;
    };
  };
};
