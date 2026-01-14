type IntegrationListItemProps = {
  name: string;
  title: string;
  description: string;
  logo: string;
  modalDescription: string;
};

export const INTEGRATION_LIST_ITEMS: IntegrationListItemProps[] = [
  {
    name: "Stripe",
    title: "Connected Stripe Account",
    description: "Stripe is the fastest and easiest way to integrate payments.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfQ0Zah6zuQLAQWojHL0QM7InosE_X4RUdA&s",
    modalDescription:
      "Stripe is the fastest and easiest way to integrate payments",
  },
];
