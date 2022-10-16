import { /* ComponentFixture, */ TestBed, waitForAsync,
} from '@angular/core/testing';
// import { of } from 'rxjs';
// import { createSpyObjWithProps } from 'src/test-utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { HttpClient } from '@angular/common/http';
import { HeaderUtilityService } from '../services/header-utility.service';
import { ResponseStatusHandlerService,
} from '../services/response-status-handler.service';
import { LoggingService } from '../services/logging.service';

import { CrudApi } from '../api/crud-api.service';
import { PictureApi } from '../api/picture-api.service';

import { CastApi } from '../api/cast-api.service';
import { SegmentApi } from '../api/segment-api.service';
import { UserApi } from '../api/user-api.service';

import { CastEditor } from './cast-editor.component';
import { CastModule } from './cast.module';

import { ContextService } from '../services/context.service';

import { SuperBalletDisplayService,
} from '../services/super-ballet-display.service';
import { ChangeDetectorRef } from '@angular/core';

describe('CastEditorComponent', () => {
  const fakeChangeDetectorRef = {} as ChangeDetectorRef;
  const fakeActivatedRoute = {snapshot: { params: { uuid: 'testUUID' } }
    } as unknown as ActivatedRoute;
  const fakeLocation = {} as Location;
  const fakeSuperBalletDisplay = {} as SuperBalletDisplayService;

  // const mockCastApi = createSpyObjWithProps<CastApi>({
  //   baseName: 'mockCastApi',
  //   methods: {
  //     loadAllCasts: Promise.resolve([]),
  //     hasCast: false,
  //   },
  //   props: {castEmitter: of([])},
  // });
  // const mockSegmentApi = createSpyObjWithProps<SegmentApi>({
  //   baseName: 'mockSegmentApi',
  //   methods: { loadAllSegments: Promise.resolve([]) },
  //   props: { segmentEmitter: of([]) },
  // });
  // const mockUserApi = createSpyObjWithProps<UserApi>({
  //   baseName: 'mockUserApi',
  //   methods: { loadAllUsers: Promise.resolve([]) },
  //   props: { userEmitter: of([]) },
  // });
  const mockSegmentDisplayList =
    jasmine.createSpyObj('mockSegmentDisplayList', ['buildDisplayList']);

  const fakeHttpClient = {} as HttpClient;
  const fakeHeaderUtilityService = {} as HeaderUtilityService;
  const fakeRespHandler = {} as ResponseStatusHandlerService;
  const fakeLoggingService = {} as LoggingService;
  const fakePictureApi = {} as PictureApi;

  const strCrudApi = new CrudApi<string>(
    fakeHttpClient,
    fakeHeaderUtilityService,
    fakeRespHandler,
    fakeLoggingService,
  );

  const g = new ContextService();

  const segmentApi = new SegmentApi(strCrudApi);
  const castApi = new CastApi(
    fakeHttpClient,
    fakeHeaderUtilityService,
    fakeRespHandler,
    segmentApi,
    g,
    strCrudApi);

    const userApi = new UserApi(strCrudApi, fakePictureApi);

  let component: CastEditor;
  // let fixture: ComponentFixture<CastEditor>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
          declarations: [CastEditor],
          imports: [
            CastModule,
          ],
          providers: [
            // { provide: ChangeDetectorRef, useValue: fakeChangeDetectorRef },
            // { provide: ActivatedRoute, useValue: fakeActivatedRoute },
            // { provide: Location, useValue: fakeLocation },
            // { provide: CastApi, useValue: mockCastApi },
            // { provide: SegmentApi, useValue: mockSegmentApi },
            // { provide: UserApi, useValue: mockUserApi },
            // {
            //   provide: SuperBalletDisplayService,
            //   useValue: fakeSuperBalletDisplay
            // },
            // {
            //   provide: SegmentDisplayListService,
            //   useValue: mockSegmentDisplayList
            // },
          ]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(CastEditor);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    component = new CastEditor(
      fakeChangeDetectorRef,
      fakeActivatedRoute,
      fakeLocation,
      castApi,
      segmentApi,
      userApi,
      fakeSuperBalletDisplay,
      mockSegmentDisplayList,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
