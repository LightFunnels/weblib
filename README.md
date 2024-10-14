
## lightfunnels/ui

### Why Choose Our Library?

- no js configuration needed - only css variables
- all classnames are declared globally and customizable
- all classnames are prefixed with lfui- to avoid naming collision with other packages or your css
- quickest way to use a ui library
- classnames naming convention .lfui-\[AlertBody\]_\[default\]
- online theme playground (comming soon)

https://www.figma.com/design/BpMDUCZALHfhKf5Qsm5VfR/Weblib?node-id=1-108&node-type=canvas&t=Q7puAiPbscPAgfaK-0

to do:
ekxQ9LepnX3mEe
ErFmOGC
deal with badge components


avoid overflow:hidden and z-index
never use css nesting
don´t use css condition:
	.lfui-dropdownItem:not(.lfui-dropdownItem_active):hover {
	  background-color: var(--interaction-color);
	}
dont use interfaces