import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';
import * as fromCore from '@web/app/core/store';

import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';
import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-workflow',
  templateUrl: './index-page-workflow.component.html',
  styles: []
})
export class IndexPageWorkflowComponent implements OnInit {

  query$ = this.store.pipe(select(fromWorkflow.getQuery, take(1)));

  data$ = this.store.pipe(select(fromWorkflow.getAllEntities));
  total$ = this.store.pipe(select(fromWorkflow.getTotal));
  perPage$ = this.store.pipe(select(fromWorkflow.getPerPage));
  from$ = this.store.pipe(select(fromWorkflow.getFrom));
  to$ = this.store.pipe(select(fromWorkflow.getTo));
  configTable: any;

  constructor(
    private store: Store<fromWorkflow.State>
  ) {
    this.configTable = {
      dataKey: 'workflow_id',
      cols: [
        { fields: ['workflow_id'], header: ['workflow.model.workflow_id'], style: { 'width': '10%' } },
        { fields: ['workflow_name'], header: ['workflow.model.workflow_name'], style: { 'width': '20%' } },
        { fields: ['workflow_description'], header: ['workflow.model.workflow_description'], style: { 'width': '70%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(workflowSearch: SearchWorkflow) {
    this.store.dispatch(new fromWorkflow.LoadEntity({
      search: {
        workflow: workflowSearch.workflow,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['workflow', 'create']
    }));
  }

  onEdit(workflow: Workflow) {
    this.store.dispatch(new fromCore.Go({
      path: ['workflow', workflow.workflow_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromWorkflow.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['workflow']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromWorkflow.ResetSearch());
  }
}