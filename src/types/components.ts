export interface BaseComponentProps {
  className?: string;
}

export interface WorkDataItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}
