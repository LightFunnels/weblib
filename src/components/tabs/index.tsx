import React, { createContext, useContext, useState } from 'react';
import { cx, cva, type VariantProps } from "class-variance-authority";
import './tabs.scss';

const tabsVariants = cva(
  "lfui-tabs",
  {
    variants: {
      variant: {
        primary: "lfui-tabs_primary",
        secondary: "lfui-tabs_secondary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type TabsVariants = VariantProps<typeof tabsVariants>;

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariants['variant'];
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

type TabsProps = React.HTMLAttributes<HTMLDivElement>& TabsVariants &{
  defaultValue: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className, variant = "primary", ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={cx(tabsVariants({ variant }), className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const tabsListVariants = cva(
  "lfui-tabs-list",
  {
    variants: {
      variant: {
        primary: "lfui-tabs-list_primary",
        secondary: "lfui-tabs-list_secondary",
      },
    },
  }
);

type TabsListProps = React.HTMLAttributes<HTMLDivElement> 

export const TabsList: React.FC<TabsListProps> = ({ children, className, ...props }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within a Tabs component');

  return (
    <div className={cx(tabsListVariants({ variant: context.variant }), className)} {...props}>
      {children}
    </div>
  );
};

const tabsTriggerVariants = cva(
  "lfui-tabs-trigger",
  {
    variants: {
      variant: {
        primary: "lfui-tabs-trigger_primary",
        secondary: "lfui-tabs-trigger_secondary",
      },
    },
  }
);

type TabsTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className, ...props }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');

  const { activeTab, setActiveTab, variant } = context;

  return (
    <div
      className={cx(
        tabsTriggerVariants({ variant }),
        activeTab === value && "lfui-tabs-trigger_active",
        className
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </div>
  );
};

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className, ...props }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return (
    <div className={cx("lfui-tabsContent", className)} {...props}>
      {children}
    </div>
  );
};
