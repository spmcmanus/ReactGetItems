import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactGetItemsStrings';
import ReactGetItems from './components/ReactGetItems';
import { IReactGetItemsProps } from './components/IReactGetItemsProps';
import { IReactGetItemsWebPartProps } from './IReactGetItemsWebPartProps';
import { css } from 'office-ui-fabric-react';

export default class ReactGetItemsWebPart extends BaseClientSideWebPart<IReactGetItemsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactGetItemsProps > = React.createElement(
      ReactGetItems,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl
      }
    );

    // element
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
