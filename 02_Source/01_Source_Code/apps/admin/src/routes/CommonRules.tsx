import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';
import { CommonRulesTable } from '../features/common-rules-management/components/CommonRulesTable';
import { CreateCommonRuleButton } from '../features/common-rules-management/components/CreateCommonRuleButton';

export default function CommonRules() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Common rules', to: '/common-rules' }]} />
      <PageContent
        label="Common Rule Management"
        PageActionComponent={<CreateCommonRuleButton />}
      >
        <CommonRulesTable />
      </PageContent>
    </>
  );
}
